import AppiumLauncher from '../src/launcher'
import childProcess from 'child_process'
import fs from 'fs-extra'

jest.mock('child_process', () => ({
    spawn: jest.fn(),
}))
jest.mock('fs-extra', () => ({
    createWriteStream: jest.fn(),
    ensureFileSync: jest.fn(),
}))

class eventHandler {
    registered = {};

    delegate(event, callback) {
        this.registered[event] = callback
    }

    trigger(event, data) {
        this.registered[event](data)
    }
}

class MockProcess {
    _eventHandler = new eventHandler()
    once() {
        this._eventHandler.trigger('data', '[Appium] Welcome to Appium v1.11.1')
        this._eventHandler.trigger('data', '[Appium] Appium REST http interface listener started on localhost:4723')
    }
    removeListener() {}
    kill() {}
    stdout = { pipe: jest.fn(), on: this._eventHandler.delegate.bind(this._eventHandler) }
    stderr = { pipe: jest.fn(), once: jest.fn() }
}

class MockFailingProcess extends MockProcess {
    constructor(exitCode = 2) {
        super()
        this.exitCode = exitCode
    }

    once(event, callback) {
        if (event === 'exit') {
            callback(this.exitCode)
        }
    }
}

class MockCustomFailingProcess extends MockFailingProcess {
    stderr = { pipe: jest.fn(), once: jest.fn().mockImplementation((event, cb) => cb(new Error('Uups'))) }
}

jest.mock('../src/utils', () => ({
    getFilePath: jest.fn().mockReturnValue('/some/file/path'),
    getAppiumCommand: jest.fn().mockReturnValue('/appium/command/path'),
    cliArgsFromKeyValue: jest.fn().mockReturnValue(['--foo', 'bar'])
}))

describe('Appium launcher', () => {
    const originalPlatform = process.platform

    beforeEach(() => {
        global.console.error = jest.fn()
        childProcess.spawn.mockClear()
        childProcess.spawn.mockReturnValue(new MockProcess())
    })

    describe('onPrepare', () => {
        test('should set correct config properties', async () => {
            const launcher = new AppiumLauncher({
                logPath: './',
                command: 'path/to/my_custom_appium',
                args: { foo: 'bar' }
            }, [], {})
            launcher._startAppium = jest.fn().mockImplementation((cmd, args, cb) => cb(null, new MockProcess()))
            await launcher.onPrepare()

            expect(launcher.process).toBeInstanceOf(MockProcess)
            expect(launcher.logPath).toBe('./')
            expect(launcher.command).toBe('path/to/my_custom_appium')
            expect(launcher.appiumArgs).toEqual(['--foo', 'bar'])
        })

        test('should set correct config properties for Windows', async () => {
            Object.defineProperty(process, 'platform', {
                value: 'win32'
            })

            const launcher = new AppiumLauncher({
                logPath: './',
                command: 'path/to/my_custom_appium',
                args: { foo: 'bar' }
            }, [], {})
            await launcher.onPrepare()

            expect(launcher.command).toBe('cmd')
            expect(launcher.appiumArgs).toEqual(['/c', 'path/to/my_custom_appium', '--foo', 'bar'])
        })

        test('should set correct config properties when empty', async () => {
            const launcher = new AppiumLauncher({}, [], {})
            await launcher.onPrepare()

            expect(launcher.logPath).toBe(undefined)
            expect(launcher.command).toBe('node')
            expect(launcher.appiumArgs).toEqual(['/appium/command/path', '--foo', 'bar'])
        })

        test('should start Appium', async () => {
            const launcher = new AppiumLauncher({ args: { superspeed: true } }, [], {})
            await launcher.onPrepare()

            expect(childProcess.spawn.mock.calls[0][0]).toBe('node')
            expect(childProcess.spawn.mock.calls[0][1]).toEqual(['/appium/command/path', '--foo', 'bar'])
            expect(childProcess.spawn.mock.calls[0][2]).toEqual({ stdio: ['ignore', 'pipe', 'pipe'] })
        })

        test('should fail if Appium exits', async () => {
            const launcher = new AppiumLauncher({}, [], {})
            childProcess.spawn.mockReturnValue(new MockFailingProcess(1))

            let error
            try {
                await launcher.onPrepare({})
            } catch (e) {
                error = e
            }
            const expectedError = new Error('Appium exited before timeout (exit code: 1)')
            expect(error).toEqual(expectedError)
        })

        test('should fail and error message if Appium already runs', async () => {
            const launcher = new AppiumLauncher({}, [], {})
            childProcess.spawn.mockReturnValue(new MockFailingProcess(2))

            let error
            try {
                await launcher.onPrepare({})
            } catch (e) {
                error = e
            }
            const expectedError = new Error('Appium exited before timeout (exit code: 2)\n' +
                "Check that you don't already have a running Appium service.")
            expect(error).toEqual(expectedError)
        })

        test('should fail with Appium error message', async () => {
            const launcher = new AppiumLauncher({}, [], {})
            childProcess.spawn.mockReturnValue(new MockCustomFailingProcess(2))

            let error
            try {
                await launcher.onPrepare({})
            } catch (e) {
                error = e
            }
            const expectedError = new Error('Appium exited before timeout (exit code: 2)\nError: Uups')
            expect(error).toEqual(expectedError)
        })
    })

    describe('onComplete', () => {
        test('should call process.kill', async () => {
            const launcher = new AppiumLauncher({}, [], {})
            await launcher.onPrepare({})
            launcher.process.kill = jest.fn()
            launcher.onComplete()
            expect(launcher.process.kill).toBeCalled()
        })

        test('should not call process.kill', () => {
            const launcher = new AppiumLauncher({}, [], {})
            expect(launcher.process).toBe(undefined)
            launcher.onComplete()
            expect(launcher.process).toBe(undefined)
        })
    })

    describe('_redirectLogStream', () => {
        test('should not write output to file', async () => {
            const launcher = new AppiumLauncher({}, [], {})
            launcher._redirectLogStream = jest.fn()
            await launcher.onPrepare({})
            expect(launcher._redirectLogStream).not.toBeCalled()
        })

        test('should write output to file', async () => {
            const launcher = new AppiumLauncher({ logPath: './' }, [], {})
            await launcher.onPrepare({})

            expect(fs.createWriteStream.mock.calls[0][0]).toBe('/some/file/path')
            expect(launcher.process.stdout.pipe).toBeCalled()
            expect(launcher.process.stderr.pipe).toBeCalled()
        })
    })

    afterEach(() => {
        global.console.error.mockRestore()
        Object.defineProperty(process, 'platform', {
            value: originalPlatform
        })
    })
})

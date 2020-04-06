/// <reference types="node"/>
/// <reference types="webdriver"/>

declare namespace WebdriverIO {
    type LocationParam = 'x' | 'y';

    interface LocationReturn {
        x: number,
        y: number
    }

    type SizeParam = 'width' | 'height';

    interface SizeReturn {
        width: number,
        height: number
    }

    interface CSSProperty {
        property: string;
        value: any;
        parsed?: {
            // other
            unit?: string;
            // font-family
            value?: any;
            string: string;
            // color
            hex?: string;
            alpha?: number;
            type?: string;
            rgba?: string
        }
    }

    interface MultiRemoteCapabilities {
        [instanceName: string]: {
            capabilities: WebDriver.DesiredCapabilities;
        };
    }

    interface ServiceOption {
        [key: string]: any;
    }
    interface ServiceWithOption extends Array<string|ServiceOption>{ 0: string; 1: ServiceOption }
    type ServiceEntry = string | HookFunctions | [string, ServiceOption]

    interface MochaOpts {
        /**
         * Propagate uncaught errors?
         */
        allowUncaught?: boolean;
        /**
         * Force done callback or promise?
         */
        asyncOnly?: boolean;
        /**
         * Bail after first test failure?
         */
        bail?: boolean;
        /**
         * Check for global variable leaks?
         */
        checkLeaks?: boolean;
        /**
         * Color TTY output from reporter?
         */
        color?: boolean;
        /**
         * Delay root suite execution?
         */
        delay?: boolean;
        /**
         * Show diff on failure?
         */
        diff?: boolean;
        /**
         * Test filter given string.
         */
        fgrep?: string;
        /**
         * Tests marked only fail the suite?
         */
        forbidOnly?: boolean;
        /**
         * Pending tests fail the suite?
         */
        forbidPending?: boolean;
        /**
         * Full stacktrace upon failure?
         */
        fullTrace?: boolean;
        /**
         * Variables expected in global scope.
         */
        global?: string[];
        /**
         * Test filter given regular expression.
         */
        grep?: RegExp | string;
        /**
         * Enable desktop notifications?
         */
        growl?: boolean;
        /**
         * Display inline diffs?
         */
        inlineDiffs?: boolean;
        /**
         * Invert test filter matches?
         */
        invert?: boolean;
        /**
         * Disable syntax highlighting?
         */
        noHighlighting?: boolean;
        /**
         * Reporter name or constructor.
         */
        reporter?: string | Function;
        /**
         * Reporter settings object.
         */
        reporterOption?: object;
        /**
         * Number of times to retry failed tests.
         */
        retries?: number;
        /**
         * Slow threshold value.
         */
        slow?: number;
        /**
         * Timeout threshold value.
         */
        timeout?: number | string;
        /**
         * Interface name.
         */
        ui?: string;
    }

    interface JasmineNodeOpts {
        /**
         * Whether to stop execution of the suite after the first spec failure
         * Since Jasmine v3.3.0
         * @default false
         */
        failFast?: boolean;
        /**
         * Whether to fail the spec if it ran no expectations. By default a spec
         * that ran no expectations is reported as passed. Setting this to true
         * will report such spec as a failure.
         * Since Jasmine v3.5.0
         * @default false
         */
        failSpecWithNoExpectations: boolean;
        /**
         * Whether to cause specs to only have one expectation failure.
         * Since Jasmine v3.3.0
         * @default false
         */
        oneFailurePerSpec: boolean;
        /**
         * Whether to randomize spec execution order.
         * Since Jasmine v3.3.0
         * @default false
         */
        random: boolean;
        /**
         * Seed to use as the basis of randomization. Null causes the seed to be
         * determined randomly at the start of execution.
         * Since Jasmine v3.3.0
         * @default null
         */
        seed: Function;
        /**
         * Function to use to filter specs.
         * Since Jasmine v3.3.0
         * @default true
         */
        specFilter: Function;
    }

    interface CucumberOpts {
        /**
         * Show full backtrace for errors.
         * @default true
         */
        backtrace?: boolean;
        /**
         * Require modules prior to requiring any support files.
         * @default []
         * @example `['@babel/register']` or `[['@babel/register', { rootMode: 'upward', ignore: ['node_modules'] }]] or [() => { require('ts-node').register({ files: true }) }]`
         */
        requireModule?: string[];
        /**
         * Treat ambiguous definitions as errors.
         *
         * Please note that this is a @wdio/cucumber-framework specific option
         * and not recognized by cucumber-js itself.
         * @default false
         */
        failAmbiguousDefinitions?: boolean;
        /**
         * Abort the run on first failure.
         * @default false
         */
        failFast?: boolean;
        /**
         * Treat undefined definitions as warnings.
         * Please note that this is a @wdio/cucumber-framework specific option and
         * not recognized by cucumber-js itself.
         * @default false
         */
        ignoreUndefinedDefinitions?: boolean;
        /**
         * Only execute the scenarios with name matching the expression (repeatable).
         * @default []
         */
        name?: RegExp[];
        /**
         * Specify the profile to use.
         * @default []
         */
        profile?: string[];
        /**
         * Require files containing your step definitions before executing features.
         * You can also specify a glob to your step definitions.
         * @default []
         * @example `[path.join(__dirname, 'step-definitions', 'my-steps.js')]`
         */
        require?: string[];
        /**
         * Specify a custom snippet syntax.
         */
        snippetSyntax?: string;
        /**
         * Hide step definition snippets for pending steps.
         * @default true
         */
        snippets?: boolean;
        /**
         * Hide source uris.
         * @default true
         */
        source?: boolean;
        /**
         * Fail if there are any undefined or pending steps
         * @default false
         */
        strict?: boolean
        /**
         * Only execute the features or scenarios with tags matching the expression.
         * Please see the [Cucumber documentation](https://docs.cucumber.io/cucumber/api/#tag-expressions) for more details.
         */
        tagExpression?: string;
        /**
         * Add cucumber tags to feature or scenario name
         * @default false
         */
        tagsInTitle?: boolean;
        /**
         * Timeout in milliseconds for step definitions.
         * @default 30000
         */
        timeout?: number;
    }

    interface Options {
        runner?: string;
        /**
         * Your cloud service username (only works for Sauce Labs, Browserstack, TestingBot,
         * CrossBrowserTesting or LambdaTest accounts). If set, WebdriverIO will automatically
         * set connection options for you.
         */
        user?: string;
        /**
         * Your cloud service access key or secret key (only works for Sauce Labs, Browserstack,
         * TestingBot, CrossBrowserTesting or LambdaTest accounts). If set, WebdriverIO will
         * automatically set connection options for you.
         */
        key?: string;
        /**
         * If running on Sauce Labs, you can choose to run tests between different datacenters:
         * US or EU. To change your region to EU, add region: 'eu' to your config.
         */
        region?: string;
        /**
         * Sauce Labs provides a headless offering that allows you to run Chrome and Firefox tests headless.
         */
        headless?: string;
        /**
         * Define specs for test execution.
         */
        specs?: string[];
        /**
         * Exclude specs from test execution.
         */
        exclude?: string[];
        /**
         * An object describing various of suites, which you can then specify
         * with the --suite option on the wdio CLI.
         */
        suites?: object;
        /**
         * Maximum number of total parallel running workers.
         */
        maxInstances?: number;
        /**
         * Maximum number of total parallel running workers per capability.
         */
        maxInstancesPerCapability?: number;
        capabilities?: WebDriver.DesiredCapabilities[] | MultiRemoteCapabilities;
        /**
         * Directory to store all testrunner log files (including reporter logs and wdio logs).
         * If not set, all logs are streamed to stdout. Since most reporters are made to log to
         * stdout, it is recommended to only use this option for specific reporters where it
         * makes more sense to push report into a file (like the junit reporter, for example).
         *
         * When running in standalone mode, the only log generated by WebdriverIO will be the wdio log.
         */
        outputDir?: string;
        /**
         * Shorten url command calls by setting a base URL.
         */
        baseUrl?: string;
        /**
         * If you want your test run to stop after a specific number of test failures, use bail.
         * (It defaults to 0, which runs all tests no matter what.) Note: Please be aware that
         * when using a third party test runner (such as Mocha), additional configuration might
         * be required.
         */
        bail?: number;
        /**
         * The number of retry attempts for an entire specfile when it fails as a whole.
         */
        specFileRetries?: number;
        readonly specFileRetryAttempts?: number;
        /**
         * Default timeout for all `waitFor*` commands. (Note the lowercase f in the option name.)
         * This timeout only affects commands starting with `waitFor*` and their default wait time.
         */
        waitforTimeout?: number;
        /**
         * Default interval for all `waitFor*` commands to check if an expected state (e.g.,
         * visibility) has been changed.
         */
        waitforInterval?: number;
        /**
         * Defines the test framework to be used by the WDIO testrunner.
         */
        framework?: string;
        /**
         * Mocha specific configurations.
         */
        mochaOpts?: MochaOpts;
        /**
         * Jasmine specific configurations.
         */
        jasmineNodeOpts?: JasmineNodeOpts;
        /**
         * Cucumber specific configurations.
         */
        cucumberOpts?: CucumberOpts;
        /**
         * List of reporters to use. A reporter can be either a string, or an array of
         * `['reporterName', { <reporter options> }]` where the first element is a string
         * with the reporter name and the second element an object with reporter options.
         */
        reporters?: (string | object)[];
        /**
         * Services take over a specific job you don't want to take care of. They enhance
         * your test setup with almost no effort.
         */
        services?: ServiceEntry[];
        /**
         * Node arguments to specify when launching child processes.
         */
        execArgv?: string[];
    }

    interface RemoteOptions extends WebDriver.Options, Omit<Options, 'capabilities'> { }

    interface MultiRemoteOptions {
        [instanceName: string]: WebDriver.DesiredCapabilities;
    }

    interface Suite {}
    interface Test {}

    interface Results {
        finished: number,
        passed: number,
        failed: number
    }

    interface HookFunctions {
        /**
         * Gets executed once before all workers get launched.
         * @param config        wdio configuration object
         * @param capabilities  list of capabilities details
         */
        onPrepare?(
            config: Config,
            capabilities: WebDriver.DesiredCapabilities[]
        ): void;

        /**
         * Gets executed before a worker process is spawned and can be used to initialise specific service
         * for that worker as well as modify runtime environments in an async fashion.
         * @param cid       capability id (e.g 0-0)
         * @param caps      object containing capabilities for session that will be spawn in the worker
         * @param specs     specs to be run in the worker process
         * @param args      object that will be merged with the main configuration once worker is initialised
         * @param execArgv  list of string arguments passed to the worker process
         */
        onWorkerStart?(
            cid: string,
            caps: WebDriver.DesiredCapabilities,
            specs: string[],
            args: Config,
            execArgv: string[]
        ): void;

        /**
         * Gets executed after all workers got shut down and the process is about to exit. An error
         * thrown in the onComplete hook will result in the test run failing.
         * @param exitCode      runner exit code
         * @param config        wdio configuration object
         * @param capabilities  list of capabilities details
         * @param results       test results
         */
        onComplete?(
            exitCode: number,
            config: Config,
            capabilities: WebDriver.DesiredCapabilities,
            results: Results
        ): void;

        /**
         * Gets executed when a refresh happens.
         * @param oldSessionId session id of old session
         * @param newSessionId session id of new session
         */
        onReload?(
            oldSessionId: string,
            newSessionId: string
        ): void;

        /**
         * Gets executed before test execution begins. At this point you can access to all global
         * variables like `browser`. It is the perfect place to define custom commands.
         * @param capabilities  list of capabilities details
         * @param specs         specs to be run in the worker process
         */
        before?(
            capabilities: WebDriver.DesiredCapabilities,
            specs: string[]
        ): void;

        /**
         * Runs before a WebdriverIO command gets executed.
         * @param commandName command name
         * @param args        arguments that command would receive
         */
        beforeCommand?(
            commandName: string,
            args: any[]
        ): void;

        /**
         * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
         * beforeEach in Mocha). `stepData` and `world` are Cucumber framework specific properties.
         * @param test      details to current running test (or step in Cucumber)
         * @param context   context to current running test
         * @param stepData  Cucumber step data
         * @param world     Cucumber world
         */
        beforeHook?(test: any, context: any, stepData?: any, world?: any): void;

        /**
         * Gets executed just before initialising the webdriver session and test framework. It allows you
         * to manipulate configurations depending on the capability or spec.
         * @param config        wdio configuration object
         * @param capabilities  list of capabilities details
         * @param specs         list of spec file paths that are to be run
         */
        beforeSession?(
            config: Config,
            capabilities: WebDriver.DesiredCapabilities,
            specs: string[]
        ): void;

        /**
         * Hook that gets executed before the suite starts.
         * @param suite suite details
         */
        beforeSuite?(suite: Suite): void;

        /**
         * Function to be executed before a test (in Mocha/Jasmine) starts.
         * @param test      details to current running test (or step in Cucumber)
         * @param context   context to current running test
         */
        beforeTest?(test: Test, context: any): void;

        /**
         * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
         * afterEach in Mocha). `stepData` and `world` are Cucumber framework specific.
         * @param test      details to current running test (or step in Cucumber)
         * @param context   context to current running test
         * @param result    test result
         * @param stepData  Cucumber step data
         * @param world     Cucumber world
         */
        afterHook?(test: any, context: any, result: {
            error?: any,
            result?: any,
            passed: boolean,
            duration: number,
            retries: { limit: number, attempts: number }
        }, stepData?: any, world?: any): void;

        /**
         * Gets executed after all tests are done. You still have access to all global variables from
         * the test.
         * @param result        number of total failing tests
         * @param capabilities  list of capabilities details
         * @param specs         list of spec file paths that are to be run
         */
        after?(
            result: number,
            capabilities: WebDriver.DesiredCapabilities,
            specs: string[]
        ): void;

        /**
         * Runs after a WebdriverIO command gets executed
         * @param commandName  command name
         * @param args         arguments that command would receive
         * @param result       result of the command
         * @param error        error in case something went wrong
         */
        afterCommand?(
            commandName: string,
            args: any[],
            result: any,
            error?: Error
        ): void;

        /**
         * Gets executed right after terminating the webdriver session.
         * @param config        wdio configuration object
         * @param capabilities  list of capabilities details
         * @param specs         list of spec file paths that are to be run
         */
        afterSession?(
            config: Config,
            capabilities: WebDriver.DesiredCapabilities,
            specs: string[]
        ): void;

        /**
         * Hook that gets executed after the suite has ended
         * @param suite suite details
         */
        afterSuite?(suite: Suite): void;

        /**
         * Function to be executed after a test (in Mocha/Jasmine) ends.
         * @param test      details to current running test (or step in Cucumber)
         * @param context   context to current running test
         * @param result    test result
         */
        afterTest?(test: Test, context: any, result: {
            error?: any,
            result?: any,
            passed: boolean,
            duration: number,
            retries: { limit: number, attempts: number }
        }): void;
    }
    type _HooksArray = {
        [K in keyof Pick<HookFunctions, "onPrepare" | "onWorkerStart" | "onComplete" | "before" | "after" | "beforeSession" | "afterSession">]: HookFunctions[K] | Array<HookFunctions[K]>;
    };
    type _Hooks = Omit<HookFunctions, "onPrepare" | "onWorkerStart" | "onComplete" | "before" | "after" | "beforeSession" | "afterSession">;
    interface Hooks extends _HooksArray, _Hooks { }

    type ActionTypes = 'press' | 'longPress' | 'tap' | 'moveTo' | 'wait' | 'release';
    interface TouchAction {
        action: ActionTypes,
        x?: number,
        y?: number,
        element?: Element,
        ms?: number
    }
    type TouchActions = string | TouchAction | TouchAction[];

    type WaitForOptions = {
        timeout?: number,
        interval?: number,
        timeoutMsg?: string,
        reverse?: boolean,
    }

    type DataMatcher = {
        name: string,
        args: Array<string>
    }

    type ReactSelectorOptions = {
        props?: object,
        state?: any[] | number | string | object | boolean
    }

    type MoveToOptions = {
        xOffset?: number,
        yOffset?: number
    }

    type DragAndDropOptions = {
        duration?: number
    }

    type NewWindowOptions = {
        windowName?: string,
        windowFeatures?: string
    }

    type ClickOptions = {
        button?: number | string,
        x?: number,
        y?: number
    }

    type WaitUntilOptions = {
        timeout?: number,
        timeoutMsg?: string,
        interval?: number
    }

    interface Element {
        selector: string;
        elementId: string;

        /**
         * w3c
         */
        "element-6066-11e4-a52e-4f735466cecf"?: string;

        /**
         * jsonwp
         */
        ELEMENT?: string;

        /**
         * index in array of elements
         * only applicable if the element found with `$$` command
         */
        index?: number;

        /**
         * WebdriverIO.Element or WebdriverIO.BrowserObject
         */
        parent: Element | WebdriverIO.BrowserObject;

        /**
         * add command to `element` scope
         */
        addCommand(
            name: string,
            func: Function
        ): void;
        // ... element commands ...
    }

    interface ElementArray extends Array<Element> {
        selector: string | Function;
        parent: Element | WebdriverIO.BrowserObject;
        foundWith: string;
        props: any[];
    }

    interface Timeouts {
        implicit?: number,
        pageLoad?: number,
        script?: number
    }

    interface Browser {
        config: Config;
        options: RemoteOptions;

        /**
         * add command to `browser` or `element` scope
         */
        addCommand(
            name: string,
            func: Function,
            attachToElement?: boolean
        ): void;

        /**
         * overwrite `browser` or `element` command
         */
        overwriteCommand(
            name: string,
            func: (origCommand: Function, ...args: any[]) => any,
            attachToElement?: boolean
        ): void;

        /**
         * create custom selector
         */
        addLocatorStrategy(
            name: string,
            func: (elementFetchingMethod: (selector: string) => any) => void
        ): void
        // ... browser commands ...
    }

    interface Config extends Options, Omit<WebDriver.Options, "capabilities">, Hooks {}
}

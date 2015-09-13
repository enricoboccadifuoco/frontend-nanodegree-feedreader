/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */

    /**
     *  RSS Feeds
     */
    describe('RSS Feeds', function() {

        /*
         * Check type of allFeeds before each it
         */
        beforeEach(function() {
            expect(allFeeds instanceof Array).toBeTruthy();
        });

        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('allFeeds should be defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*
         * for each feed, url should exists and should be valid
         */
        it('feed url exists', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
                expect(feed.url).toMatch(/^http(s?)\:\/\//);
            });
        });


        /*
         * for each feed, name should exists and should be valid
         */
        it('feed name exists', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
                expect(typeof feed.name).toBe('string');
            });
        });
    });

    /**
     *  The menu
     */
    describe('The menu', function() {

        var body = $("body");
        var menuElement = $(".menu").length ? $(".menu").eq(0) : null;

        /*
         * Hide menu before each it
         */
        beforeEach(function() {
            body.addClass("menu-hidden");
        });

        /*
         * left menu should be hidden
         */
        it('should be hidden', function() {
            expect(body.hasClass("menu-hidden")).toBe(true);
        });

         /*
          * on first menu-icon-link click
          * left menu should be shown
          *
          * on second menu-icon-link click
          * left menu should be hidden
          */
        it('on-click menu should not be hidden', function() {
            $(".menu-icon-link").click();
            expect(body.hasClass("menu-hidden")).toBe(false);

            $(".menu-icon-link").click();
            expect(body.hasClass("menu-hidden")).toBe(true);
        });
    });

    /**
     *  Initial Entries
     */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /*
         * Check entries number, to be greater than 0, after loadFeed response
         */
        it('should exists at least a single .entry element within the .feed container', function (done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });

    /**
     *  New Feed Selection
     */
    describe('New Feed Selection', function() {

        var feedTitle, feetContent;

        /*
         * Store first feed title and content to compare it with next call
         */
        beforeEach(function(done) {
            loadFeed(0, function() {
                feedTitle = $("h1.header-title").html();
                feetContent = $(".feed").text();
                loadFeed(1, done);
            });
        });

        /*
         * Check feed title and content when a new feed is loaded
         */
         it('should change the content when a new feed is loaded', function(done) {
             expect($("h1.header-title").html()).not.toBe(feedTitle);
             expect($(".feed").text()).not.toBe(feetContent);
             done();
         });

         // restore default
         afterAll(function(done) {
             loadFeed(0, done);
         });
    });

}());

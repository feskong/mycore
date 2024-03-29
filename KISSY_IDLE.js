mycore
======

var S = KISSY,
            Event = S.Event;

    (function () {
        var events = 'keydown mousemove touchstart touchmove mousewheel';
        Event._Special.idle = {
            setup: function () {
                if (this !== window) {
                    return;
                }
                Event.on(document, events, check);
            },
            tearDown: function () {
                Event.detach(document, events, check);
            },
            add: function (observer) {
                idleThreshold = observer.idleThreshold || idleThreshold;
            }
        };

        var idleTimer,
                idleThreshold = 10000,
                idleIndex = 0;

        function check() {
            if (idleTimer) {
                clearTimeout(idleTimer);
            }
            var lastIdleTime = S.now();
            idleTimer = setTimeout(function () {
                idleTimer = null;
                Event.fire(window, 'idle', {
                    idleIndex: ++idleIndex,
                    idleTime: S.now() - lastIdleTime
                });
            }, idleThreshold);
        }
    })();


    Event.on(window, 'idle', {
        fn: function (e) {
            S.log('idle!');
            S.log(e.idleIndex);
            S.log(e.idleTime);
        },
        idleThreshold: 1000
    });


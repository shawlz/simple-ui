angular.module('app').directive('uiToBottom', [function() {
    return {
        scope: {
            uiToBottom: "="
        },
        link: function(scope, element) {
            scope.$watchCollection('uiToBottom', function(newValue) {
                if (newValue) {
                    $(element).scrollTop($(element)[0].scrollHeight);
                }
            });
        }
    };
}]);
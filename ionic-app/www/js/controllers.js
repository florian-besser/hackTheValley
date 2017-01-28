angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, $ionicPlatform, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };

  $ionicPlatform.ready(function() {
    ble.isEnabled(
      function() {
        $scope.devices = [];
        ble.startScan([],  /* scan for all services */
          function(peripheral){
            var newDeviceArray = [];
            for(i = 0; i < $scope.devices.length; i++) {
              newDeviceArray.push($scope.devices[i]);
            }
            newDeviceArray.push(peripheral);
            $scope.devices = newDeviceArray;
          },
          function(error){
            $scope.error = error;
          });

        // stop scan after 5 seconds
        setTimeout(ble.stopScan, 5000,
          function() {
            console.log("scan stopped");
          },
          function() {
            console.log("stopScan failed");

          }
        );
      },
      function() {
        alert("Bluetooth is *not* enabled");
      }
    );

  });
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});

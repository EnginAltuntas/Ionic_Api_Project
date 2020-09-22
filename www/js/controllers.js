angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope, $http, $state, $rootScope) {
    $rootScope.sayfa = undefined;
    $scope.kullanici_kontrol = function(ka,s) {
        $http.get("http://localhost:64393/api/Giris?ka=" + ka + "&s=" + s).then(function (response) {
            if (response.data == 0) {
                alert(response.data);
                alert("kullanici adi veya sifre yanlis girildi");
                
            }
            else if(response.data==9191){
                $rootScope.sayfa = 1; //yönetici
                $state.go("tab.chats");
            }
            else
                $rootScope.sayfa = 2; //müþteri
                $rootScope.mId = response.data; // müþteri_id 
                $state.go("tab.musteri");

        });
    }

})

    .controller('SepetCtrl', function ($scope, $http, $state, $rootScope, Chats) {
        $scope.$on('$ionicView.enter', function (e) {
            if ($rootScope.sayfa == undefined) { $state.go("tab.dash"); alert("uye bilgileri olmadan kullanilamaz"); }
            else if ($rootScope.sayfa == 1) { $state.go("tab.dash"); alert("Yoneticiler bu alani kullanamaz"); }

        });

        $http.get("http://localhost:64393/api/Musteri?mId=" + $rootScope.mId).then(function (response) {
            $scope.sepetim = response.data;

        });
        $scope.s_yenile = function () {
            $http.get("http://localhost:64393/api/Musteri?mId=" + $rootScope.mId).then(function (response) {
                $scope.sepetim = response.data;

            });
        }
          
    })

.controller('MusteriCtrl', function ($scope, $http, $state, Chats, $rootScope) {

    $scope.$on('$ionicView.enter', function (e) {
        if ($rootScope.sayfa == undefined) { $state.go("tab.dash"); alert("uye bilgileri olmadan kullanilamaz"); }
        else if ($rootScope.sayfa == 1) {$state.go("tab.dash"); alert("Yoneticiler bu alani kullanamaz"); }

    });

    $http.get("http://localhost:64393/api/Giris").then(function (response) {
        $scope.urunler = response.data;
    });

    $scope.sepetekle = function (uId) {

        $http.get("http://localhost:64393/api/Musteri?mId="+$rootScope.mId+"&uId="+uId).then(function (response) {
            if (response.data != null)
                alert("sepete eklendi. Sepetim bolumunden sayfayi yenileyerek kontrol edebilirsiniz");
        });
    }

    $scope.sepeti_listele = function () {   
          $state.go("tab.sepet");
        }
    


})

.controller('ChatsCtrl', function ($scope,$state, $rootScope, Chats, $http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
    //
  //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.$on('$ionicView.enter', function (e) {
        if ($rootScope.sayfa == undefined) $state.go("tab.dash");
        if($rootScope.sayfa == 2) {$state.go("tab.dash"); alert("Musteriler bu alani kullanamaz"); }
    });



        $http.get("http://localhost:64393/api/Giris").then(function (response) {
            $scope.urunler = response.data;
        });

        $scope.urunu_sil = function (uId) {
            $http.get("http://localhost:64393/api/Giris?uId=" + uId).then(function (response) {
                $scope.urunler = response.data;
            });
        }
        $scope.sayfa_yenile = function () {
            $http.get("http://localhost:64393/api/Giris").then(function (response) {
                $scope.urunler = response.data;
            });
        }

        $scope.urunu_guncelle = function (uId) {
            $rootScope.urun_id = uId;
            $state.go("tab.chat-detail");
        }

        $scope.chats = Chats.all();
        $scope.remove = function (chat) {
            Chats.remove(chat);
        };
    
})

.controller('ChatDetailCtrl', function ($scope,$state, $rootScope, $stateParams, Chats, $http) {
    
        $scope.$on('$ionicView.enter', function (e) {
            if ($rootScope.sayfa == undefined) $state.go("tab.dash");
            if ($rootScope.sayfa == 2) {$state.go("tab.dash"); alert("Musteriler bu alani kullanamaz"); }
        });

        $scope.u_guncelle = function (isim, fiyat) {
            $http.get("http://localhost:64393/api/Giris?uId=" + $rootScope.urun_id + "&isim=" + isim + "&fiyat=" + fiyat).then(function (response) {
                alert("Guncelleme basarili,Sayfayi yenileyerek sonucu gorebilirsiniz");
            });

        }

    
})

.controller('AccountCtrl', function ($scope,$rootScope, $http ,$state) {

    $scope.$on('$ionicView.enter', function (e) {
        if ($rootScope.sayfa == undefined) $state.go("tab.dash");
        if ($rootScope.sayfa == 2) {$state.go("tab.dash"); alert("Musteriler bu alani kullanamaz"); }
    });

        $scope.urunu_kaydet = function (u_isim, u_fiyat) {

            $http.get("http://localhost:64393/api/Giris?isim=" + u_isim + "&fiyat=" + u_fiyat).then(function (response) {
                if (response.data != null)
                    alert("Kayit basarili.Sayfayi yenile butonuna basarak kaydi ekranda gorebilirsiniz");
            });

        }

        $scope.settings = {
            enableFriends: true
        };
    
});

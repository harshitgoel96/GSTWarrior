angular.module('starter.controllers', [])
/*
<feature name="IonBoxPlugin">
<param name="android-package" value="com.harshit.ionBox.DB.IonBoxPlugin" />
</feature>
 */
.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope : $scope
	}).then(function (modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function () {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function () {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function () {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function () {
			$scope.closeLogin();
		}, 1000);
	};
})

.controller('PlaylistsCtrl', function ($scope) {
	$scope.playlists = [{
			title : 'Reggae',
			id : 1
		}, {
			title : 'Chill',
			id : 2
		}, {
			title : 'Dubstep',
			id : 3
		}, {
			title : 'Indie',
			id : 4
		}, {
			title : 'Rap',
			id : 5
		}, {
			title : 'Cowbell',
			id : 6
		}
	];
})

/*{"access_token":"9E83tzHtGjoAAAAAAAAAN9qyr5QPgYpDdZVzFhx1evTcoXFoSNSmkLPBjtbAq_io","token_type":"bearer","uid":"366677678"}"


 */
.controller('StartCtrl', function ($scope, $cordovaOauth, $ionicPlatform, $cordovaSQLite) {
	$ionicPlatform.ready(function () {

	if(!ionic.Platform.isWindowsPhone()){
		$scope.isAuthenticated = false;
		$scope.token = 'empty';
		// end of db.transaction

		cordova.exec(function success(data) {
			console.log("call completed with success");
			console.log("response from CORDOVA EXEC" + JSON.stringify(data));

			if (data.success == true) {

				if (data.valuePresent == true) {
					$scope.isAuthenticated = true;
					$scope.token = data.value;
					console.log("!!!!!!!!!!!!!! trying to get token::" + data.value);

				} else {
					$scope.isAuthenticated = false;
					$scope.token = 'none';
					console.log("********tring*************");
					$cordovaOauth.dropbox('kn14g1sqmk5byv9').then(function (result) {
						console.log(JSON.stringify(result));
						//var data = JSON.parse(result);
						cordova.exec(function success(data) {
							console.log("**************" + JSON.stringify(data));
							$scope.isAuthenticated = true;
							$scope.token = result.access_token;

						}, function error(err) {
							console.log("!!!! error " + err);
						}, 'IonBoxPlugin',
							'storeInCache',
							['token', result.access_token]);

					}, function (error) {
						console.log(error);
					});
				}

			}
		}, function error(err) {
			console.log("call completed with error");
			console.log("!!!! error " + err);
		}, 'IonBoxPlugin',
			'getFromCache',
			['token']);
}
	});
})

//browseCtrl
.controller('browseCtrl', function ($scope, $stateParams, $ionicLoading,$http) {
	//$scope.Data = JSON.parse('');
	//{"hash": "0edd30c0be941dc48f2281cc638eee05", "thumb_exists": false, "bytes": 0, "path": "/", "is_dir": true, "icon": "folder", "root": "dropbox", "contents": [{"rev": "42e41048b",	"thumb_exists": false, "path": "/dummy folder", "is_dir": true, "icon": "folder", "read_only": false, "modifier": null, "bytes": 0, "modified": "Thu, 23 Apr 2015 05:50:05 +0000", "size": "0 bytes", "root": "dropbox",	"revision": 4}, {"rev": "12e41048b", "thumb_exists": false, "path": "/Getting Started.pdf", "is_dir": false, "client_mtime": "Thu, 11 Dec 2014 11:22:10 +0000", "icon": "page_white_acrobat", "read_only": false,	"modifier": null, "bytes": 249159, "modified": "Thu, 11 Dec 2014 11:22:09 +0000", "size": "243.3 KB", "root": "dropbox", "mime_type": "application/pdf", "revision": 1}, {"rev": "32e41048b", "thumb_exists": false,	"path": "/Henning Nelms - Magic and Showmanship.pdf", "is_dir": false, "client_mtime": "Fri, 12 Dec 2014 06:17:26 +0000", "icon": "page_white_acrobat", "read_only": false, "modifier": null, "bytes": 56311222,	"modified": "Fri, 12 Dec 2014 06:17:26 +0000", "size": "53.7 MB", "root": "dropbox", "mime_type": "application/pdf", "revision": 3}, {"rev": "22e41048b", "thumb_exists": false, "path": "/mycolt.zip", "is_dir": false,	"client_mtime": "Thu, 11 Dec 2014 11:31:08 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 86047754, "modified": "Thu, 11 Dec 2014 11:31:08 +0000", "size": "82.1 MB", "root":	"dropbox", "mime_type": "application/zip", "revision": 2}], "size": "0 bytes"}'
	//{"hash": "ad37ce1527997767665ceca95d063da8", "thumb_exists": false, "bytes": 0, "path": "/", "is_dir": true, "icon": "folder", "root": "dropbox", "contents": [{"rev": "380688e90e", "thumb_exists": false, "path": "/CSO  IPA lab F-1-0.10FP.app.zip", "is_dir": false, "client_mtime": "Thu, 25 Apr 2013 12:24:26 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 59803, "modified": "Thu, 25 Apr 2013 12:24:26 +0000", "size": "58.4 KB", "root": "dropbox", "mime_type": "application/zip", "revision": 56}, {"rev": "5d0688e90e", "thumb_exists": false, "path": "/dojo-release-1.10.1.zip", "is_dir": false, "client_mtime": "Thu, 18 Sep 2014 08:31:31 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 13698701, "modified": "Thu, 18 Sep 2014 08:31:31 +0000", "size": "13.1 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 93}, {"rev": "5a0688e90e", "thumb_exists": false, "path": "/fos_android_v29.zip", "is_dir": false, "client_mtime": "Tue, 02 Sep 2014 10:01:41 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 45936983, "modified": "Tue, 02 Sep 2014 10:01:41 +0000", "size": "43.8 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 90}, {"rev": "70688e90e", "thumb_exists": false, "path": "/Getting Started.pdf", "is_dir": false, "client_mtime": "Thu, 15 Mar 2012 13:47:04 +0000", "icon": "page_white_acrobat", "read_only": false, "modifier": null, "bytes": 246000, "modified": "Thu, 15 Mar 2012 13:47:04 +0000", "size": "240.2 KB", "root": "dropbox", "mime_type": "application/pdf", "revision": 7}, {"rev": "580688e90e", "thumb_exists": false, "path": "/iosFeetOnStreet.zip", "is_dir": false, "client_mtime": "Fri, 25 Jul 2014 09:03:22 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 165794592, "modified": "Fri, 25 Jul 2014 09:03:22 +0000", "size": "158.1 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 88}, {"rev": "850688e90e", "thumb_exists": false, "path": "/mycolt.zip", "is_dir": false, "client_mtime": "Fri, 21 Nov 2014 06:37:40 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 50902354, "modified": "Fri, 21 Nov 2014 06:37:40 +0000", "size": "48.5 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 133}, {"rev": "3a0688e90e", "thumb_exists": false, "path": "/newCSO_1.17_tg final.zip", "is_dir": false, "client_mtime": "Tue, 04 Jun 2013 07:52:29 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 8270863, "modified": "Tue, 04 Jun 2013 13:29:12 +0000", "size": "7.9 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 58}, {"rev": "590688e90e", "thumb_exists": false, "path": "/realIOSFeetOnStreet.zip", "is_dir": false, "client_mtime": "Fri, 25 Jul 2014 11:29:36 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 34469132, "modified": "Fri, 25 Jul 2014 11:29:36 +0000", "size": "32.9 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 89}, {"rev": "620688e90e", "thumb_exists": false, "path": "/special", "is_dir": true, "icon": "folder", "read_only": false, "modifier": null, "bytes": 0, "modified": "Sat, 27 Sep 2014 08:26:34 +0000", "size": "0 bytes", "root": "dropbox", "revision": 98}, {"rev": "5e0688e90e", "thumb_exists": false, "path": "/telerik.kendoui.professional.2014.2.903.trial.zip", "is_dir": false, "client_mtime": "Thu, 18 Sep 2014 08:32:03 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 33056198, "modified": "Thu, 18 Sep 2014 08:32:03 +0000", "size": "31.5 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 94}, {"rev": "420688e90e", "thumb_exists": false, "path": "/TG_ProvEng", "is_dir": true, "icon": "folder", "read_only": false, "modifier": null, "bytes": 0, "modified": "Fri, 16 Aug 2013 09:28:01 +0000", "size": "0 bytes", "root": "dropbox", "revision": 66}, {"rev": "5f0688e90e", "thumb_exists": false, "path": "/touch-2.4.0-commercial.zip", "is_dir": false, "client_mtime": "Thu, 18 Sep 2014 08:32:58 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 56849198, "modified": "Thu, 18 Sep 2014 08:32:58 +0000", "size": "54.2 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 95}], "size": "0 bytes"}
	//$scope.Data = JSON.parse('{"hash": "ad37ce1527997767665ceca95d063da8", "thumb_exists": false, "bytes": 0, "path": "/", "is_dir": true, "icon": "folder", "root": "dropbox", "contents": [{"rev": "380688e90e", "thumb_exists": false, "path": "/CSO  IPA lab F-1-0.10FP.app.zip", "is_dir": false, "client_mtime": "Thu, 25 Apr 2013 12:24:26 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 59803, "modified": "Thu, 25 Apr 2013 12:24:26 +0000", "size": "58.4 KB", "root": "dropbox", "mime_type": "application/zip", "revision": 56}, {"rev": "5d0688e90e", "thumb_exists": false, "path": "/dojo-release-1.10.1.zip", "is_dir": false, "client_mtime": "Thu, 18 Sep 2014 08:31:31 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 13698701, "modified": "Thu, 18 Sep 2014 08:31:31 +0000", "size": "13.1 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 93}, {"rev": "5a0688e90e", "thumb_exists": false, "path": "/fos_android_v29.zip", "is_dir": false, "client_mtime": "Tue, 02 Sep 2014 10:01:41 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 45936983, "modified": "Tue, 02 Sep 2014 10:01:41 +0000", "size": "43.8 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 90}, {"rev": "70688e90e", "thumb_exists": false, "path": "/Getting Started.pdf", "is_dir": false, "client_mtime": "Thu, 15 Mar 2012 13:47:04 +0000", "icon": "page_white_acrobat", "read_only": false, "modifier": null, "bytes": 246000, "modified": "Thu, 15 Mar 2012 13:47:04 +0000", "size": "240.2 KB", "root": "dropbox", "mime_type": "application/pdf", "revision": 7}, {"rev": "580688e90e", "thumb_exists": false, "path": "/iosFeetOnStreet.zip", "is_dir": false, "client_mtime": "Fri, 25 Jul 2014 09:03:22 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 165794592, "modified": "Fri, 25 Jul 2014 09:03:22 +0000", "size": "158.1 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 88}, {"rev": "850688e90e", "thumb_exists": false, "path": "/mycolt.zip", "is_dir": false, "client_mtime": "Fri, 21 Nov 2014 06:37:40 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 50902354, "modified": "Fri, 21 Nov 2014 06:37:40 +0000", "size": "48.5 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 133}, {"rev": "3a0688e90e", "thumb_exists": false, "path": "/newCSO_1.17_tg final.zip", "is_dir": false, "client_mtime": "Tue, 04 Jun 2013 07:52:29 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 8270863, "modified": "Tue, 04 Jun 2013 13:29:12 +0000", "size": "7.9 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 58}, {"rev": "590688e90e", "thumb_exists": false, "path": "/realIOSFeetOnStreet.zip", "is_dir": false, "client_mtime": "Fri, 25 Jul 2014 11:29:36 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 34469132, "modified": "Fri, 25 Jul 2014 11:29:36 +0000", "size": "32.9 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 89}, {"rev": "620688e90e", "thumb_exists": false, "path": "/special", "is_dir": true, "icon": "folder", "read_only": false, "modifier": null, "bytes": 0, "modified": "Sat, 27 Sep 2014 08:26:34 +0000", "size": "0 bytes", "root": "dropbox", "revision": 98}, {"rev": "5e0688e90e", "thumb_exists": false, "path": "/telerik.kendoui.professional.2014.2.903.trial.zip", "is_dir": false, "client_mtime": "Thu, 18 Sep 2014 08:32:03 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 33056198, "modified": "Thu, 18 Sep 2014 08:32:03 +0000", "size": "31.5 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 94}, {"rev": "420688e90e", "thumb_exists": false, "path": "/TG_ProvEng", "is_dir": true, "icon": "folder", "read_only": false, "modifier": null, "bytes": 0, "modified": "Fri, 16 Aug 2013 09:28:01 +0000", "size": "0 bytes", "root": "dropbox", "revision": 66}, {"rev": "5f0688e90e", "thumb_exists": false, "path": "/touch-2.4.0-commercial.zip", "is_dir": false, "client_mtime": "Thu, 18 Sep 2014 08:32:58 +0000", "icon": "page_white_compressed", "read_only": false, "modifier": null, "bytes": 56849198, "modified": "Thu, 18 Sep 2014 08:32:58 +0000", "size": "54.2 MB", "root": "dropbox", "mime_type": "application/zip", "revision": 95}], "size": "0 bytes"}');

$scope.shouldShowDelete = false;
	$scope.alerter = function (text) {
		alert(text);
	}
	$scope.toggleDelete = function () {
		$scope.shouldShowDelete = !$scope.shouldShowDelete;
	}
	
	$scope.getIconClass = function (appIcon) {
		//console.log(appIcon);
			if(appIcon.document_type==='d'){
				return "fa-folder";
			}
			else{
				return "fa-file"
			}
			}
	
	
	$scope.contents = [];
	$scope.currentPath = "/";
	$scope.goBackPath = "/";
	$scope.doExecOnPath=function(path){
	
		$scope.contents.length=0;
		$scope.goBackPath = $scope.currentPath ;
		$scope.currentPath =path;
		
		console.log($scope.currentPath);
			$ionicLoading.show({
				template : 'Loading...'
			});


		$http({
  method: 'post',
  url: '/GetFolderData.php?path='+path
}).then(function successCallback(response_data) {
		var response=response_data.data;
		console.log(	response);
				
				$scope.contents= response.contents;
					
					var newPath=response.path;
					if(newPath){
					var indexOfS=newPath.lastIndexOf("/");
					if(newPath.length>1){
						var parentPath=newPath.substr(0,indexOfS);
						if(parentPath.length<1)
						{
							parentPath='/';
						}
						console.log("**@@@***  "+parentPath);
						var temp={};
						temp.document_type='d';
						temp.path=parentPath;
						temp.icon="folder";
						temp.document_name='..';
						//temp.isGoBack==true;
					$scope.contents.unshift(temp);
					
					}
				}
					/*
					if($scope.currentPath!==$scope.goBackPath){
					var temp={};
					temp.is_dir=true;
					temp.path=$scope.goBackPath;
					temp.isGoBack==true;
					$scope.contents.unshift(temp);
					}*/
					$ionicLoading.hide();
				
				 }, function errorCallback(response) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
		
		
	}
	$scope.getPathContent = function (fileMeta) {
		//getFolderContent
		if (!fileMeta && $scope.currentPath === "/") {
			$scope.doExecOnPath("/");

		} else if (fileMeta) {

			if (fileMeta.document_type=='d') {
				if(fileMeta.document_name=='..')
				{
					fileMeta.document_name='';
				}
				if(fileMeta.path!='/' && fileMeta.document_name!='..'){
					fileMeta.document_name='/'+fileMeta.document_name;
				}
			$scope.doExecOnPath(fileMeta.path+fileMeta.document_name);
			
				
			} else {
				alert("called by non root file: file download not implemented yet");

			}
			console.log($scope.currentPath);
			/*cordova.exec(function success(data){

			},
			function err(err){

			},
			'IonBoxPlugin',
			'getFolderContent',
			[false,fileMeta]
			);*/
		} else {
			console.log("just tab switched no need to recall code");
		}
	}

	



})

.controller('PlaylistCtrl', function ($scope, $stateParams) {});

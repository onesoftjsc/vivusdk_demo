# VivuSDK for javascript

## 1. Giới thiệu

VivuSdkJS là thư viện hỗ trợ livestreaming viết cho javascript. Sử dụng thư viện này, nhà phát triển không cần quan tâm tới hạ tầng server bên dưới. Chế độ phân tải, high avaiable được đảm bảo để dịch vụ chạy ổn định 24/7.
## 2. Live Demo
- Link demo [Quay](https://bigmath.vn/bigfoxjs/demo/sharescreen/main/live.html) [Xem](https://bigmath.vn/bigfoxjs/demo/sharescreen/main/view.html)
- Link demo [Hội nghị](https://bigmath.vn/bigfoxjs/demo/vvconference/main/index.html)

Để sử dụng thư viện, bạn có 2 cách, hoặc sử dụng Tags thêm vào phần tử cha của trang html hoặc bằng cách lập trình.
Trong cả hai trường hợp, đều phải thêm các dòng sau vào header của trang html

```
<meta name="serverSDK" content="wss://vivulive.com:6612" />
<script src="https://bigmath.vn/jquery-3.2.1.min.js"></script>
<link rel="stylesheet" href="https://bigmath.vn/bigfoxjs/vivusdk/public/ivivu.css"/>
<script src="https://bigmath.vn/bigfoxjs/bigfox/public/ibigfox.js"></script>
<script src="https://bigmath.vn/bigfoxjs/vivusdk/public/ivivu.js"></script>
<script src="https://bigmath.vn/bigfoxjs/vivusdk/public/iplayer.js"></script>

```


## 3. Khởi tạo

### 3.1 Kết nối
```
ivivu.init(appId, success, error);
- success = function(sessionId) // hàm trả về khi kết nối tới Server SDK thành công kèm theo giá trị sessionId
- error = function(message) // trả về khi lỗi, kèm theo nội dung lỗi 

```
Lưu ý: hàm khởi tạo ivivu.init phải được gọi sau khi document đã load xong

### 3.2 Xác thực
```
ivivu.authenticate(token, success, error);
- success = function() // hàm trả về khi xác thực tài khoản thành công
- error = function(message) // trả về khi lỗi, kèm theo nội dung lỗi 

```

Sau khi khởi tạo bằng hàm ivivu.init thành công, cần gọi hàm ivivu.authenticate với giá trị token để xác thực tài khoản.
Giá trị token được tính bằng công thức token = md5(appId + secretKey + sessionId) trong đó appId và secretKey được cung cấp khi đăng ký tài khoản trên trang http://vivusdk.com 

Ví dụ của việc sử dụng hàm ivivu.init và ivivu.authenticate
```
$( document ).ready(function() {
	var appId = '7aaa34b7-c78c-4d41-88a7-0929f86084d4';
	var secretKey = 'ec58b2d92e282f363f7c367e27f82feb49669c40';
	ivivu.init(appId, 
	   //init success
	   function (sessionId) {
 	   var token = md5(appId + secretKey + sessionId);
	   ivivu.authenticate(token, 
  	       //authenticate success
 	       function(){
 	               ivivu.onVideoConnected = function(vplayer){}
        	       ivivu.onVideoDisconnected = function(vplayer){}
	       },
	       //authenticate error
 	       function(){
  	       }
	   );
	   }),
	   //init error
 	   function(){
 	   };
});

```
Khởi tạo dịch vụ, kết nối tới server sdk tại địa chỉ khai báo bởi ```<meta name="serverSDK" content="wss://vivulive.com:6612" />```  trong header của file html.
Nếu init thành công, sẽ gọi hàm authenticate để xác thực, nếu xác thực thành công thì bắt đầu các công việc khác.

```ivivu.onVideoConnected = function(vplayer)  - callback khi một video kết nối truyền dữ liệu thành công```
```ivivu.onVideoDisconnect = function(vplayer)  - callback khi một video mất kết nối ```


##3. Tags

Kích thước của Video sẽ tự động dãn full theo kích thước phần tử html cha lưu trữ nó

###3.1 Live
```
<video class = 'vivusdk-live-video' liveId ='12345' /> 
```
###3.1 View
```
<video class = 'vivusdk-view-video' liveId ='12345' /> 
```
##4. Lập trình
### 4.1 Tạo Video 

- ```var vplayer = ivivu.createNewVideo(type, liveId);``` - Tạo video mới với liveId, kiểu live hoặc view
- ```type = ‘view' || ‘live'``` - tương ứng với video live hay video xem
### 4.2 Cấu hình Video
```
vplayer.setup({
audioId: <value>,
videoId: <value>,
resolution: <value>
});
```
Sau khi cấu hình Video có thể gọi hàm ```vplayer.start()``` hoặc ``vplayer.restart()`` để bắt đầu video 
### 4.3 Bắt đầu live hoặc xem
```vplayer.start();```
### 4.4 Hiển thị Video ở bên trong một tag bất kỳ của trang HTML
```vplayer.addParent(domId);```
### 4.5 Dừng live hoặc xem
```vplayer.stop();```
 
### 4.6 Thay đổi độ phân giải của Video
```vplayer.setResolution(value); // value = 144 | 240 | 360 | 480 | 720```

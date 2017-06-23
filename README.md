# VivuSDK for javascript

## 1. Giới thiệu

VivuSdkJS là thư viện hỗ trợ livestreaming viết cho javascript. Sử dụng thư viện này, nhà phát triển không cần quan tâm tới hạ tầng server bên dưới. Chế độ phân tải, high avaiable được đảm bảo để dịch vụ chạy ổn định 24/7.
## 2. Live Demo
- Link demo [Quay](https://bigmath.vn/bigfoxjs/demo/sharescreen/main/live.html) [Xem](https://bigmath.vn/bigfoxjs/demo/sharescreen/main/view.html)
- Link demo [Hội nghị](https://bigmath.vn/bigfoxjs/demo/vvconference/main/index.html)
## 3. Khởi tạo dịch vụ
### 3.1 Thêm các dòng sau vào header của trang HTML (index.html)

```
<meta name="appId" content="12345678"/>
<meta name="serverSDK" content="wss://vivulive.com:6612" />
	<script src="https://bigmath.vn/jquery-3.2.1.min.js"></script>
<link rel="stylesheet" href="https://bigmath.vn/bigfoxjs/vivusdk/public/ivivu.css"/>
<script src="https://bigmath.vn/bigfoxjs/bigfox/public/ibigfox.js"></script>
<script src="https://bigmath.vn/bigfoxjs/vivusdk/public/ivivu.js"></script>
<script src="https://bigmath.vn/bigfoxjs/vivusdk/public/iplayer.js"></script>

```
### 3.2 Khởi tạo dịch vụ
```
$( document ).ready(function() {
 ivivu.init(‘appId’, function () {
  ivivu.authenticate(‘token’, function(){
        // To do here when authenticate success
        ivivu.onVideoConnected = function(vplayer){
        }
        ivivu.onVideoDisconnected = function(vplayer){
        }
  });
});
});

```
Khởi tạo dịch vụ, kết nối tới server sdk tại địa chỉ khai báo bởi ```<meta name="serverSDK" content="wss://vivulive.com:6612" />```  trong header của file html.
Nếu init thành công, sẽ gọi hàm authenticate để xác thực, nếu xác thực thành công thì bắt đầu các công việc khác.

```ivivu.onVideoConnected = function(vplayer)  - callback khi một video kết nối truyền dữ liệu thành công```
```ivivu.onVideoDisconnect = function(vplayer)  - callback khi một video mất kết nối ```

### 3.3 Tạo Video 

- ```var vplayer = ivivu.createNewVideo(type, liveId);``` - Tạo video mới với liveId, kiểu live hoặc view
- ```type = ‘view' || ‘live'``` - tương ứng với video live hay video xem
### 3.4 Cấu hình Video
```
vplayer.setup({
audioId: <value>,
videoId: <value>,
resolution: <value>
});
```
Sau khi cấu hình Video có thể gọi hàm ```vplayer.start()``` hoặc ``vplayer.restart()`` để bắt đầu video 
### 3.5 Bắt đầu live hoặc xem
```vplayer.start();```
### 3.6 Hiển thị Video ở bên trong một tag bất kỳ của trang HTML
```vplayer.addParent(domId);```
### 3.7 Dừng live hoặc xem
```vplayer.stop();```
 
### 3.8 Thay đổi độ phân giải của Video
```vplayer.setResolution(value); // value = 144 | 240 | 360 | 480 | 720```

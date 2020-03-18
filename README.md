# PM2.5-monitor

未知bug：有时候从Login页面进入TabHome主页，或者从DeviceScreen进入Scan页面时会造成应用闪退。这个问题目前只在我的旧设备上出现（Nexus 5X Android6.0）。在新设备（小米9 Android10）与虚拟机（Android8.0）内无问题。

有时候把Home与Scan页面上的MyHeader控件去掉，就没事了。

我有次实验时把DeviceScreen上的Gif图去掉好像也有效果。但若尝试多次从DeviceScreen页面进入Scan页面又会重新造成闪退。

闪退时在log中不会看到任何出错提示。猜测这个问题可能跟设备的性能有关系，这可能也跟react-native或者react-navigation这些库不稳定有关，在旧设备上运行效果不好。
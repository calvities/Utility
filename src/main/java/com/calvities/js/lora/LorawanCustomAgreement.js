console.log(analysisData('12671221'));



function analysisData(buf) {

    var bytes = new Array(buf.toString().length/2);
    var j = 0;
    for(var i = 0;i <bytes.length;i++){
        bytes[i] = parseInt(buf.toString().substring(j,j+2),16);//将数组转成10进制
        j = j + 2;
    }
    var arr = bytes.map(Number);
    console.log(arr);
    var num = arr[1].toString(10);
    console.log(num);
    return bytes;
    console.log(analysisData());
//console.log(num2Hex(1,2));
//console.log(establishTimeByte(analysisData(),2,1));

    function analysisData() {
        var buf = '01740000000102670110030003040104';
        var bytes = new Array(buf.toString().length/2);
        var j = 0;
        for(var i = 0;i <bytes.length;i++){
            bytes[i] = parseInt(buf.toString().substring(j,j+2),16);//将数组转成10进制
            j = j + 2;
        }
        console.log(bytes);

        var data = {};
        var kk = -1, p = 0;
        var numlen = bytes.length;//新数组长度
        var chnoLen = 0;//通道总长度
        do {
            var payload = new Array(numlen);
            for (var i = 0; i < payload.length; i++)
                payload[i] = bytes[++kk];
            kk = -1;//初始化k
            //console.log(payload);
            var len = 0;//payload数据长度
            switch(payload[++p]){
                case 0://数字输入
                    data.DigitalInput=parseInt(customByte(payload,1,1),16);
                    len = 1;
                    break;
                case 1://数字输出
                    data.DigitalOutput=parseInt(customByte(payload,1,1),16);
                    len = 1;
                    break;
                case 103://温度
                    data.Temperature=num2Hex(parseInt(customByte(payload,2,1),16)/10,2);
                    len = 2;
                    break;
                case 116://电压
                    data.Voltage=parseInt(customByte(payload,4,1),16)/1000;
                    len = 4;
                    break;
                case 103:
                    break;
            }
            p = 0;
            var chnolength = len + 2;//数据部分长度+头长度+数据长度的字节长度
            chnoLen = chnolength + chnoLen;//通道总长度
            kk = chnoLen + kk;//kk加上通道长,确保新数组是从解析的通道之后的部分
            numlen = numlen - chnolength;//通道部分数组长度 减去 累加的通道长度
        } while (numlen != 0);
        var jsonString = JSON.stringify(data);
        //console.log(jsonString);
        return jsonString;

    }

    /**
     * 数值转正负数
     * @param num 数值
     * @param len 长度
     * @returns {num}
     */
    function num2Hex(num,len) {
        if(((num>>(len*8-1)) & 0x01) == 0x01)
            return (num - (0x01<<(len*8)));
        return num;
    }


    /**
     * 创建自定义长度byte数组
     * @param buf 数组
     * @param len 长度
     * @param k 数组下标
     * @returns {String}
     */
    function customByte(buf,len,k){
        if (buf == null) return null;
        var bytes = new Array(len);
        for (var i = 0;i < bytes.length;i++){
            bytes[i] = buf[++k].toString(16);
        }
        //console.log("自定义:"+bytes.join(''))
        return bytes.join('');
    }



}
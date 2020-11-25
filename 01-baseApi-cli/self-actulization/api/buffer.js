const buf1 = Buffer.alloc(10)//分配一个十个字节的内存空间

// <Buffer 00 00 00 00 00 00 00 00 00 00> 每一个0 都是一个16进制数字符 每个16进制数字符需要用4位二进制位表示 那么 两个 16进制数字符代表8位二进制位 也就是一个字节 
console.log(buf1);

// <Buffer 61> 包含ascii
const buf2 = Buffer.from('a')
console.log(buf2,buf2.toString());

// <Buffer e4 b8 ad>
// 创建Buffer包含UTF-8字节 
// UFT-8：一种变长的编码方案，使用 1~6 个字节来存储； 
// UFT-32：一种固定长度的编码方案，不管字符编号大小，始终使用 4 个字节来存储； 
// UTF-16：介于 UTF-8 和 UTF-32 之间，使用 2 个或者 4 个字节来存储，长度既固定又可变。
// 变长编码 编码过程消耗性能较高 但是存储空间相对较少
// 定长编码 相反
const buf3 = Buffer.from('中')
console.log(buf3);

//合并 图片的上传 二进制 => 分包接受
const buf4 = Buffer.concat([buf2,buf3])
console.log(buf4);

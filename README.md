# swdev-final

<h2>deploy ไปยังเครื่อง server ที่กำหนดให้</h2>
<ul>
<li>frontend: <a href="http://159.223.45.216:2015">http://159.223.45.216:2015</a></li>
<li>backend: <a href="http://159.223.45.216:2016">http://159.223.45.216:2016</a></li>
</ul>
<p><strong>ลิงก์สำรอง Heroku</strong></p>
<ul>
<li>frontend: <a href="https://final-62070215-frontend.herokuapp.com">https://final-62070215-frontend.herokuapp.com</a></li>
<li>backend: <a href="https://final-62070215-backend.herokuapp.com">https://final-62070215-backend.herokuapp.com</a></li>
</ul>
<h2>update pipeline</h2>
<p>Update Pipeline : Auto Deploy and Build in target server</p>
<p>มีการเพิ่มขั้นตอน deploy ลงไปใน Jenkins Pipeline ทั้งในส่วนของ Frontend และ Backend ซึ่งเป็นการ deploy ไปยังเครื่อง server เป้าหมาย โดยมีกระบวนการทำงานของขั้นตอนนี้ ดังนี้</p>
<ul>
<li>frontend: <a href="http://128.199.188.21:8080/job/final-62070215-frontend/">http://128.199.188.21:8080/job/final-62070215-frontend/</a></li>
<li>backend: <a href="http://128.199.188.21:8080/job/final-62070215-backend/">http://128.199.188.21:8080/job/final-62070215-backend/</a></li>
</ul>
<p><strong>Frontend</strong></p>
<ol>
<li>ทำการกำหนด environment variable เพื่อใช้ในการเชื่อมต่อไปยังเครื่อง target server แล</li>
<li>ทำการเชื่อมต่อกับเครื่อง target server</li>
<li>ทำการ clone git ลงเครื่อง target server ที่เชื่อมต่ออยู่</li>
<li>ทำการ build เลข version โดยใช้ build number ของ jenkins มาช่วยในการกำหนดเลข version</li>
<li>ทำการสร้างไฟล์เพื่อใช้ในการเก็บเลข version ที่ build ขึ้นมา ก่อนจะส่งไฟล์ไปยังเครื่อง target server ที่เชื่อมต่ออยู่</li>
<li>ทำการ build Docker Image บนเครื่อง target server ที่เชื่อมต่ออยู่</li>
<li>ทำการ Run Container บนเครื่อง target server ที่เชื่อมต่ออยู่</li>
<li>ทำการ clear file ที่ clone จาก git ออกจากเครื่อง target server ที่เชื่อมต่ออยู่</li>
</ol>
<p><img src="https://github.com/docxed/swdev-final/blob/main/wiki/4.PNG?raw=true" alt="" /></p>
<p><strong>Backend</strong></p>
<ol>
<li>ทำการกำหนด environment variable เพื่อใช้ในการเชื่อมต่อไปยังเครื่อง target server แล</li>
<li>ทำการเชื่อมต่อกับเครื่อง target server</li>
<li>ทำการ clone git ลงเครื่อง target server ที่เชื่อมต่ออยู่<br />สร้าง file .env ผ่าน jenkins credential เพื่อใช้เก็บข้อมูลที่ secret</li>
<li>ทำการ build เลข version โดยใช้ build number ของ jenkins มาช่วยในการกำหนดเลข version</li>
<li>ทำการสร้างไฟล์เพื่อใช้ในการเก็บเลข version ที่ build ขึ้นมา ก่อนจะส่งไฟล์ไปยังเครื่อง target server ที่เชื่อมต่ออยู่</li>
<li>ทำการ build Docker Image บนเครื่อง target server ที่เชื่อมต่ออยู่</li>
<li>ทำการ Run Container บนเครื่อง target server ที่เชื่อมต่ออยู่</li>
<li>ทำการ clear file ที่ clone จาก git ออกจากเครื่อง target server ที่เชื่อมต่ออยู่</li>
</ol>
<p><img src="https://github.com/docxed/swdev-final/blob/main/wiki/5.PNG?raw=true" alt="" /></p>
<h2>ฟีเจอหลัก: ลงทะเบียนนัดฉีดวัคซีนโควิด-19</h2>
<p><img src="https://github.com/docxed/swdev-final/blob/main/wiki/1.PNG?raw=true" alt="" /></p>
<p dir="auto">user flow ของการลงทะเบียนนัดฉีดวัคซีนโควิด-19</p>
<ol>
<li>ผู้ใช้ทำการกรอกข้อมูลเบอร์และรหัสผ่าน</li>
<li>ผู้ใช้เข้าสู่หน้าลงทะเบียนนัดฉีดวัคซีนโควิด-19</li>
<li>ผู้ใช้ทำการกรอกรายละเอียดการนัดฉีดวัคซีน</li>
<li>ผู้ใช้กดทำรายการเพื่อทำการนัด หน้าเว็บจะพาไปหน้าประวัติการจอง</li>
</ol>
<h2>UI Flow</h2>
<p><img src="https://github.com/docxed/swdev-final/blob/main/wiki/2.jpg?raw=true" alt="" /></p>
<p>UI Flow ของ featureลงทะเบียนนัดฉีดวัคซีนโควิด-19 ประกอบด้วย 3 หน้าหลัก ได้แก่ หน้า ลงทะเบียนเบอร์, หน้ากรอกข้อมูล, หน้าประวัติการจอง</p>
<h2>Acceptance Test</h2>
<p><img src="https://github.com/docxed/swdev-final/blob/main/wiki/3.png?raw=true" alt="" /></p>
<p>case1: การที่ระบบจะสามารถแสดงผลข้อมูลเกี่ยวกับการติดเชื้อโควิดได้นั้นจะต้อง ทำการ Get ข้อมูลจากเว็บปลายทางสำเร็จ<br />case2: การที่ระบบไม่สามาถแสดงผลข้อมูลเกี่ยวกับการติดเชื้อโควิดได้นั้นสามารถเกิดจากระบบไม่สามารถ Get ข้อมูล จากเว็บปลายทางได้</p>
<h2>Project management tool</h2>
<p><a title="Trello" href="https://trello.com/b/BaoNMJGh">https://trello.com/b/BaoNMJGh</a></p>
<h2>Technical</h2>
<p>ในส่วนของ Technical จะแบ่งออกเป็น 3 ส่วน ดังนี้</p>
<p><strong>Frontend</strong></p>
<p>ในส่วนของ Frontend จะมีขั้นตอนในการพัฒนาอยู่ทั้งหมด 5 ขั้นตอนดังนี้</p>
<ol>
<li>ทำการวิเคราะห์และเลือกฟีเจอร์ที่ต้องการจะทำ</li>
<li>ทำการออกแบบ UI หน้า Frontend ของฟีเจอร์ที่เลือก</li>
<li>ทำการพัฒนา Frontend ของฟีเจอร์ที่เลือก ตาม UI ที่ได้ออกแบบไว้ โดยใช้ Vue.js</li>
<li>ทำการทดสอบระบบ Frontend ทั้งในส่วนของ unit test, component test และ E2E test โดยทำในรูปแบบของ Automated test</li>
<li>ทำการ build และ deploy project ส่วนของ Frontend ลงในเครื่อง localhost โดยใช้ docker</li>
</ol>
<p><strong>Backend</strong></p>
<p>ในส่วนของ Backend จะมีขั้นตอนในการพัฒนาอยู่ทั้งหมด 5 ขั้นตอนดังนี้</p>
<ol>
<li>ทำการวิเคราะห์และเลือกฟีเจอร์ที่ต้องการจะทำ</li>
<li>ทำการออกแบบ api Backend ที่ให้บริการข้อมูลในฟีเจอร์ที่เลือก</li>
<li>ทำการพัฒนา Backend ของฟีเจอร์ที่เลือก ตาม api ที่ได้ออกแบบไว้ โดยใช้ express.js</li>
<li>ทำการทดสอบระบบ Backend ทั้งในส่วนของ unit test, component test และ E2E test โด</li>
<li>ทำในรูปแบบของ Automated test</li>
<li>ทำการ build และ deploy project ส่วนของ Backend ลงในเครื่อง localhost โดยใช้ docker</li>
</ol>
<p><strong>Database</strong></p>
<p>ในส่วนของ Backend จะมีขั้นตอนในการพัฒนาอยู่ทั้งหมด 3 ขั้นตอนดังนี้</p>
<ol>
<li>ทำการออกแบบ Database ในรูปแบบของ RDBMS เพื่อใช้ในการเก็บข้อมูลที่จำเป็นสำหรับฟีเจอร์ที่เลือกไว้</li>
<li>ทำการสร้าง Database ตามที่ได้ออกแบบไว้ โดยใช้ MySQL ในการพัฒนา</li>
<li>ทำการเชื่อมต่อ database เข้ากับส่วนของ backend เพื่อทำการใช้งาน</li>
</ol>
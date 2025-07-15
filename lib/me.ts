export const meTemplate = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>تسجيل جديد في مكتب جميعة صالح للمحاماة والاستشارات القانونية</title>
    <style>
      body { margin: 0; padding: 0; background: #fff; }
      table, td { font-family: Tahoma, Arial, Helvetica, sans-serif; }
      .info-label { color: #FFD700; font-weight: bold;}
      .info { color: #111; background: #f9f9f9; border-radius:5px; padding:4px 8px; margin-right:8px;}
      @media (max-width: 660px) {
        .row-content { width: 100%!important; }
        .stack .column { width: 100%!important; display: block!important; }
      }
    </style>
  </head>
  <body style="background: #fff;">
    <table width="100%" style="background: #fff;" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table width="640" style="margin: 0 auto; border-radius: 16px; overflow: hidden;">
            <tr>
              <td style="background: linear-gradient(101deg, rgba(12,28,25,1) 0%, rgba(52,89,82,1) 100%); padding: 0;">
                <div style="text-align:center; padding: 40px 0 0 0;">
                  <img src="https://www.jumaia-saleh.com/images/logo-ar-en.png" alt="شعار مكتب جمعة صالح" width="180" style="max-width: 200px; display: block; margin: 0 auto;"/>
                </div>
                <h1 style="margin: 45px 0 10px 0; color: #fff; text-align: center; font-size: 31px; font-weight: bold;">
                  تسجيل عميل جديد
                </h1>
                <h2 style="margin: 10px 0 0; color: #FFD700; text-align: center; font-size: 22px;">
                  بيانات المشترك الجديد:
                </h2>
                <table dir="rtl" align="center" cellpadding="6" style="margin:18px auto 10px auto; background: rgba(255,255,255,.96); border-radius:12px; font-size:16px;">
                  <tr>
                    <td class="info-label">البريد الإلكتروني:</td>
                    <td class="info">{{email}}</td>
                  </tr>
                  <!-- يمكنك إضافة المزيد من الأعمدة مثل الرسالة إن أردت -->
                </table>
                <p style="color: #e1e1e1; text-align: center; font-size:17px; padding: 22px 30px 0;">
                  شكراً على التسجيل في <span style="color:#FFD700;">مكتب جميعة صالح للمحاماة والاستشارات القانونية</span>.<br/>
                  سيتم التواصل معك قريباً عبر البريد أو الهاتف لمتابعة طلبك أو استفسارك.<br/>
                  إذا كنت ترغب بمراسلتنا مباشرة: 
                  <a href="mailto:jumaia@jumaia-saleh.com" style="color:#FFD700;">jumaia@jumaia-saleh.com</a>
                </p>
                
                <div style="text-align: center; margin: 30px 0 8px 0;">
                  <a href="https://www.instagram.com/jumaia.saleh/" target="_blank" style="margin: 0 4px;">
                    <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/instagram@2x.png" width="28" alt="Instagram"/>
                  </a>
                  <a href="https://wa.me/+971565955502" target="_blank" style="margin: 0 4px;">
                    <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/whatsapp@2x.png" width="28" alt="WhatsApp"/>
                  </a>
                  <a href="https://www.jumaia-saleh.com" target="_blank" style="margin: 0 4px;">
                    <img src="https://app-rsrc.getbee.io/public/resources/bee-icons/domain.png" width="28" alt="Website"/>
                  </a>
                </div>
                <p style="text-align: center; color: #d6d6d6; font-size: 13px;">
                  جميع الحقوق محفوظة &copy; 2024 <b>مكتب جمعة صالح للمحاماة</b>.<br/>
                  جميع خدماتنا القانونية ضمن قوانين دولة الإمارات العربية المتحدة.<br/>
                  Website: <a href="https://www.jumaia-saleh.com" target="_blank" style="color: #FFA;">jumaia-saleh.com</a>
                </p>
                <div style="height: 20px"></div>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
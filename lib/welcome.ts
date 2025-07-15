export const welcomeTemplate = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>مرحبا بك في مكتب جميعة صالح للمحاماة والاستشارات القانونية</title>
    <style>
      body { margin: 0; padding: 0; background: #fff; }
      table, td { font-family: Tahoma, Arial, Helvetica, sans-serif; }
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
                <h1 style="margin: 40px 0 0 0; color: #fff; text-align: center; font-size: 32px; font-weight: bold;">
                  مرحباً 
                </h1>
                <h2 style="margin: 10px 0 0; color: #f1f1f1; text-align: center; font-size: 22px;">
                  شكراً لتواصلك مع  <span style="color: #FFD700;"> مكتب جميعة صالح للمحاماة والاستشارات القانونية </span>
                </h2>
                <p style="color: #e1e1e1; text-align: center; font-size:18px; padding: 20px 30px 0;">
                  يسعدنا خدمتك وتقديم الاستشارات القانونية لك في مكتبنا في <b>عجمان، الإمارات العربية المتحدة</b>.
                  إذا كان لديك أي استفسار قانوني أو طلب، لا تتردد بالتواصل معنا في أي وقت.
                  شكراً لثقتك بنا!
                </p>
                <div style="text-align: center; margin: 25px 0;"> 
                  <a href="{{url}}" target="_blank" style="
                    background: #345952;
                    color: #fff;
                    padding: 10px 34px;
                    border-radius: 6px;
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 18px;
                    margin: 5px 0;
                    display: inline-block;
                  ">
                    تصفّح موقعنا
                  </a>
                </div>

                <div style="text-align:center; margin: 30px 0 10px 0;">
                 
                  <a href="https://www.instagram.com/jumaia.saleh/" target="_blank" style="margin: 0 4px;">
                    <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/instagram@2x.png" width="28" alt="Instagram"/>
                  </a>
                  <a href="https://wa.me/+971565955502" target="_blank" style="margin: 0 4px;">
                    <img src="https://app-rsrc.getbee.io/public/resources/social-networks-icon-sets/t-only-logo-dark-gray/whatsapp@2x.png" width="28" alt="WhatsApp"/>
                  </a>
                </div>
                <div style="height: 15px"></div>
                <p style="text-align: center; color: #d6d6d6; font-size: 13px;">
                  جميع الحقوق محفوظة &copy; 2024 <b>مكتب جمعة صالح للمحاماة</b>.
                  <br/>جميع خدماتنا القانونية ضمن قوانين دولة الإمارات العربية المتحدة.
                  <br/>Website: <a href="https://www.jumaia-saleh.com" target="_blank" style="color: #FFA;">jumaia-saleh.com</a>
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
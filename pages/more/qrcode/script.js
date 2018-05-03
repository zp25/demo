const generateQRCode = () => {
  const text = document.querySelector('#qrcode .input').value;

  QRCode.toDataURL(text, { errorCorrectionLevel: 'M' }, (err, url) => {
    if (err) {
      throw err;
    }

    const img = document.querySelector('.qrcode-output');
    img.src = url;
  });
};

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#qrcode');

  form.onsubmit = (e) => {
    e.preventDefault();
    generateQRCode();
  };

  generateQRCode();
}, false);

from flask import Flask, request, render_template, jsonify
import smtplib
from email.message import EmailMessage

app = Flask(__name__)

# Ganti ini dengan akun Gmail pengirim dan App Password
EMAIL_SENDER = 'youremail@gmail.com'
EMAIL_PASSWORD = 'your_app_password'
EMAIL_RECEIVER = 'tempurtumila17@gmail.com'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/send', methods=['POST'])
def send_email():
    name = request.form.get('name')
    email = request.form.get('email')
    phone = request.form.get('phone')
    service = request.form.get('service')
    message = request.form.get('message')

    msg = EmailMessage()
    msg['Subject'] = f"Website Contact Form: {name}"
    msg['From'] = EMAIL_SENDER
    msg['To'] = EMAIL_RECEIVER
    msg['Reply-To'] = email  # agar penerima bisa membalas langsung ke pengunjung
    msg.set_content(f"""
    Name    : {name}
    Email   : {email}
    Phone   : {phone}
    Service : {service}
    Message : {message}
    """)

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(EMAIL_SENDER, EMAIL_PASSWORD)
            smtp.send_message(msg)
        return jsonify({'success': True, 'message': 'Pesan berhasil dikirim!'})
    except Exception as e:
        return jsonify({'success': False, 'message': f'Gagal mengirim: {str(e)}'})

if __name__ == '__main__':
    app.run(debug=True)

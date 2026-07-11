"""
============================================================================
LEMANYX INTELLIGENCE - BACKEND API
============================================================================

This Flask application handles:
1. Form submissions from careers page
2. Demo request submissions
3. Email notifications
4. Database storage via Supabase

ARCHITECTURE:
- Flask: Web framework
- Supabase: Database (PostgreSQL)
- SendGrid: Email service
- CORS: Allow frontend to communicate

HOW TO RUN:
    python app.py
    
Then visit: http://localhost:5000/

============================================================================
"""

# ============================================================================
# 1. IMPORTS - Load necessary libraries
# ============================================================================

from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
from datetime import datetime
import re
from supabase import create_client, Client
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail, Email, To, Content

# Load environment variables from .env file
load_dotenv()

# ============================================================================
# 2. INITIALIZE FLASK APP
# ============================================================================

app = Flask(__name__)

# Configure CORS - allow requests from your frontend
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://www.lemanyx.com",
            "https://lemanyx.com",
            "http://localhost:3000",
            "http://localhost:8000",
            "http://127.0.0.1:3000"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

# ============================================================================
# 3. INITIALIZE EXTERNAL SERVICES
# ============================================================================

# Initialize Supabase
"""
Supabase is a database service built on PostgreSQL.
It provides secure data storage in the cloud.
"""
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Initialize SendGrid
"""
SendGrid sends emails on your behalf.
You use their API to send transactional emails (confirmations, notifications).
"""
sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
SENDER_EMAIL = os.getenv("SENDER_EMAIL")
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL")

# ============================================================================
# 4. VALIDATION FUNCTIONS
# ============================================================================

def validate_email(email):
    """
    Check if email format is valid.
    """
    pattern = r'^[^\s@]+@[^\s@]+\.[^\s@]+$'
    return re.match(pattern, email) is not None

def validate_url(url):
    """
    Check if URL starts with http:// or https://
    """
    return url.startswith('http://') or url.startswith('https://')

def validate_name(name):
    """
    Check if name is at least 3 characters
    """
    return len(name.strip()) >= 3

def validate_application_data(data):
    """
    Validate all fields in career application
    """
    if not data.get('fullname', '').strip():
        return False, "Full name is required"
    
    if not data.get('email', '').strip():
        return False, "Email is required"
    
    if not data.get('role', '').strip():
        return False, "Role is required"
    
    if not data.get('portfolio', '').strip():
        return False, "Portfolio URL is required"
    
    if not data.get('motivation', '').strip():
        return False, "Motivation is required"
    
    if not validate_name(data['fullname']):
        return False, "Name must be at least 3 characters"
    
    if not validate_email(data['email']):
        return False, "Invalid email address"
    
    if not validate_url(data['portfolio']):
        return False, "Portfolio URL must start with http:// or https://"
    
    return True, ""

def validate_demo_data(data):
    """
    Validate all fields in demo request
    """
    if not data.get('fullname', '').strip():
        return False, "Full name is required"
    
    if not data.get('email', '').strip():
        return False, "Email is required"
    
    if not data.get('company', '').strip():
        return False, "Company name is required"
    
    if not data.get('jobtitle', '').strip():
        return False, "Job title is required"
    
    if not data.get('demodate', '').strip():
        return False, "Demo date is required"
    
    if not data.get('product', '').strip():
        return False, "Product selection is required"
    
    if not validate_name(data['fullname']):
        return False, "Name must be at least 3 characters"
    
    if not validate_email(data['email']):
        return False, "Invalid email address"
    
    return True, ""

# ============================================================================
# 5. EMAIL FUNCTIONS
# ============================================================================

def send_application_confirmation_email(full_name, email, role):
    try:
        subject = "Your Application to Lemanyx Intelligence"
        
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Thank You for Your Application!</h2>
                <p>Hi {full_name},</p>
                <p>We've received your application for the <strong>{role}</strong> position at Lemanyx Intelligence.</p>
                <p>Our team is reviewing all applications carefully. If your profile matches our requirements, 
                we'll reach out to you within 5-7 business days.</p>
                <p>In the meantime, feel free to:</p>
                <ul>
                    <li>Visit our website: <a href="https://www.lemanyx.com">lemanyx.com</a></li>
                    <li>Follow us on <a href="https://instagram.com/yusuphulema">Instagram</a></li>
                    <li>Connect with us on <a href="https://linkedin.com/in/yusuphu-awadhi-lema-08675a39a">LinkedIn</a></li>
                </ul>
                <p>Best regards,<br>
                <strong>Lemanyx Intelligence Team</strong><br>
                Dar es Salaam, Tanzania<br>
                <a href="https://www.lemanyx.com">www.lemanyx.com</a></p>
            </body>
        </html>
        """
        
        message = Mail(
            from_email=Email(SENDER_EMAIL, "Lemanyx Intelligence"),
            to_emails=To(email),
            subject=subject,
            html_content=html_content
        )
        
        response = sg.send(message)
        if response.status_code == 202:
            print(f"✅ Confirmation email sent to {email}")
            return True
        else:
            print(f"❌ Failed to send email: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error sending email: {str(e)}")
        return False

def send_demo_confirmation_email(full_name, email, product, demo_date):
    try:
        subject = "Your Demo Request - Lemanyx Intelligence"
        
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>Demo Request Received!</h2>
                <p>Hi {full_name},</p>
                <p>Thank you for requesting a demo of <strong>{product}</strong>.</p>
                <p><strong>Your preferred date:</strong> {demo_date}</p>
                <p>Our team will contact you shortly to confirm the exact time and prepare a customized 
                demonstration tailored to your business needs.</p>
                <p><strong>What to expect:</strong></p>
                <ul>
                    <li>Live walkthrough of features</li>
                    <li>Q&A session</li>
                    <li>Custom use case discussion</li>
                    <li>Pricing and implementation timeline</li>
                </ul>
                <p>If you have any questions before the demo, feel free to reach out:<br>
                <strong>Email:</strong> {ADMIN_EMAIL}<br>
                <strong>WhatsApp:</strong> +255 760 356 680</p>
                <p>Looking forward to showing you what Lemanyx Intelligence can do!<br>
                <strong>Lemanyx Intelligence Team</strong></p>
            </body>
        </html>
        """
        
        message = Mail(
            from_email=Email(SENDER_EMAIL, "Lemanyx Intelligence"),
            to_emails=To(email),
            subject=subject,
            html_content=html_content
        )
        
        response = sg.send(message)
        if response.status_code == 202:
            print(f"✅ Demo confirmation email sent to {email}")
            return True
        else:
            print(f"❌ Failed to send email: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Error sending email: {str(e)}")
        return False

def send_admin_notification_email(data, form_type):
    try:
        if form_type == 'application':
            subject = f"New Career Application - {data['role']}"
            details = f"""
            <p><strong>Full Name:</strong> {data['fullname']}</p>
            <p><strong>Email:</strong> {data['email']}</p>
            <p><strong>Role:</strong> {data['role']}</p>
            <p><strong>Portfolio:</strong> <a href="{data['portfolio']}">{data['portfolio']}</a></p>
            <p><strong>Motivation:</strong></p>
            <p>{data['motivation']}</p>
            """
        else:
            subject = f"New Demo Request - {data['product']}"
            details = f"""
            <p><strong>Full Name:</strong> {data['fullname']}</p>
            <p><strong>Email:</strong> {data['email']}</p>
            <p><strong>Company:</strong> {data['company']}</p>
            <p><strong>Job Title:</strong> {data['jobtitle']}</p>
            <p><strong>Preferred Date:</strong> {data['demodate']}</p>
            <p><strong>Product:</strong> {data['product']}</p>
            """
        
        html_content = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2>New Submission!</h2>
                {details}
                <p><strong>Submitted at:</strong> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
            </body>
        </html>
        """
        
        message = Mail(
            from_email=Email(SENDER_EMAIL, "Lemanyx Intelligence"),
            to_emails=To(ADMIN_EMAIL),
            subject=subject,
            html_content=html_content
        )
        
        response = sg.send(message)
        if response.status_code == 202:
            print(f"✅ Admin notification sent")
            return True
        else:
            return False
            
    except Exception as e:
        print(f"❌ Error sending admin email: {str(e)}")
        return False

# ============================================================================
# 6. DATABASE FUNCTIONS
# ============================================================================

def save_application_to_database(data):
    try:
        db_data = {
            'fullname': data['fullname'].strip(),
            'email': data['email'].strip().lower(),
            'role': data['role'].strip(),
            'portfolio_url': data['portfolio'].strip(),
            'motivation': data['motivation'].strip(),
            'created_at': datetime.now().isoformat()
        }
        
        response = supabase.table('applications').insert(db_data).execute()
        if response.data:
            print(f"✅ Application saved to database (ID: {response.data[0]['id']})")
            return True
        else:
            print(f"❌ Failed to save application")
            return False
            
    except Exception as e:
        print(f"❌ Database error: {str(e)}")
        return False

def save_demo_request_to_database(data):
    try:
        db_data = {
            'fullname': data['fullname'].strip(),
            'email': data['email'].strip().lower(),
            'company': data['company'].strip(),
            'job_title': data['jobtitle'].strip(),
            'demo_date': data['demodate'],
            'product': data['product'].strip(),
            'created_at': datetime.now().isoformat()
        }
        
        response = supabase.table('demo_requests').insert(db_data).execute()
        if response.data:
            print(f"✅ Demo request saved to database (ID: {response.data[0]['id']})")
            return True
        else:
            print(f"❌ Failed to save demo request")
            return False
            
    except Exception as e:
        print(f"❌ Database error: {str(e)}")
        return False

# ============================================================================
# 7. API ROUTES (Endpoints)
# ============================================================================

@app.route('/', methods=['GET'])
def home():
    """Health check root endpoint"""
    return jsonify({
        'status': 'success',
        'message': 'Lemanyx Intelligence Backend is running!',
        'version': '1.0',
        'timestamp': datetime.now().isoformat()
    }), 200

@app.route('/api/submit-application', methods=['POST'])
def submit_application():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'status': 'error', 'message': 'No data provided'}), 400
        
        is_valid, error_msg = validate_application_data(data)
        if not is_valid:
            print(f"❌ Validation failed: {error_msg}")
            return jsonify({'status': 'error', 'message': error_msg}), 400
        
        saved = save_application_to_database(data)
        if not saved:
            return jsonify({'status': 'error', 'message': 'Failed to save application'}), 500
        
        send_application_confirmation_email(data['fullname'], data['email'], data['role'])
        send_admin_notification_email(data, 'application')
        
        return jsonify({
            'status': 'success',
            'message': f"Thank you {data['fullname']}! Your application has been received."
        }), 200
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Server error. Please try again later.'}), 500

@app.route('/api/submit-demo-request', methods=['POST'])
def submit_demo_request():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'status': 'error', 'message': 'No data provided'}), 400
        
        is_valid, error_msg = validate_demo_data(data)
        if not is_valid:
            print(f"❌ Validation failed: {error_msg}")
            return jsonify({'status': 'error', 'message': error_msg}), 400
        
        saved = save_demo_request_to_database(data)
        if not saved:
            return jsonify({'status': 'error', 'message': 'Failed to save demo request'}), 500
        
        send_demo_confirmation_email(data['fullname'], data['email'], data['product'], data['demodate'])
        send_admin_notification_email(data, 'demo')
        
        return jsonify({
            'status': 'success',
            'message': f"Thank you {data['fullname']}! We'll be in touch soon to schedule your demo."
        }), 200
        
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return jsonify({'status': 'error', 'message': 'Server error. Please try again later.'}), 500

@app.route('/sync/health', methods=['GET'])
def health_check():
    """Railway standard environment validation endpoint"""
    return jsonify({"status": "ok", "service": "Flask API on Railway"}), 200

# ============================================================================
# 8. ERROR HANDLERS
# ============================================================================

@app.errorhandler(404)
def not_found(error):
    return jsonify({'status': 'error', 'message': 'Endpoint not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'status': 'error', 'message': 'Server error'}), 500

# ============================================================================
# 9. RUN THE APP
# ============================================================================

if __name__ == '__main__':
    # Binds to the environment dynamic port assigned by Railway, fallback to 5000[cite: 1]
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
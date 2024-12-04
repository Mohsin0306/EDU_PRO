// Simulated email validation and subscription service
import emailjs from '@emailjs/browser';

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Email subscription with EmailJS
export const subscribeEmail = async (email: string): Promise<{ success: boolean; message: string }> => {
  if (!validateEmail(email)) {
    return {
      success: false,
      message: 'Please enter a valid email address'
    };
  }

  try {
    const templateParams = {
      to_name: 'Admin',
      from_name: 'New Subscriber',
      from_email: email,
      message: `New subscription request from ${email}`,
      reply_to: email
    };

    const result = await emailjs.send(
      'service_53r0qlc',
      'template_n0d0024',
      templateParams,
      'GsbBgea4bZufHRRW2'
    );

    if (result.status === 200) {
      return {
        success: true,
        message: 'Thank you for subscribing! We\'ll notify you when we launch.'
      };
    }

    throw new Error('Failed to send email');
  } catch (error) {
    console.error('EmailJS Error:', error);
    return {
      success: false,
      message: 'Failed to subscribe. Please try again later.'
    };
  }
};

export const initEmailJS = () => {
  emailjs.init('GsbBgea4bZufHRRW2');
};

export const handleSocialShare = (platform: string): { success: boolean; message: string } => {
  const messages = {
    Twitter: 'Check out this awesome school management system coming soon!',
    Facebook: 'Excited to share this upcoming school management platform!',
    Instagram: 'Stay tuned for something amazing!',
    LinkedIn: 'Innovation in education management coming soon!'
  };

  return {
    success: true,
    message: `${platform} integration coming soon! Share message: ${messages[platform as keyof typeof messages]}`
  };
};

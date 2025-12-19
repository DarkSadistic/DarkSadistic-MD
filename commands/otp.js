const OTPFetcher = require('../modules/otpFetcher');
const otpFetcher = new OTPFetcher();

// Available countries and services
const AVAILABLE_COUNTRIES = {
    'US': 'United States (+1)',
    'GB': 'United Kingdom (+44)',
    'IN': 'India (+91)',
    'ID': 'Indonesia (+62)',
    'BR': 'Brazil (+55)',
    'RU': 'Russia (+7)',
    'DE': 'Germany (+49)',
    'FR': 'France (+33)',
    'JP': 'Japan (+81)',
    'KR': 'South Korea (+82)'
};

const AVAILABLE_SERVICES = {
    'whatsapp': 'WhatsApp',
    'telegram': 'Telegram',
    'facebook': 'Facebook',
    'instagram': 'Instagram',
    'google': 'Google',
    'twitter': 'Twitter/X',
    'amazon': 'Amazon',
    'paypal': 'PayPal',
    'gmail': 'Gmail',
    'outlook': 'Outlook',
    'discord': 'Discord',
    'tiktok': 'TikTok',
    'snapchat': 'Snapchat',
    'uber': 'Uber',
    'netflix': 'Netflix',
    'spotify': 'Spotify'
};

module.exports = {
    name: 'otp',
    description: 'OTP fetching commands',
    
    async execute(sock, message, args) {
        const userId = message.from;
        const command = args[0];
        
        switch (command) {
            case 'countries':
                let countriesText = '🌍 Available Countries:\n\n';
                Object.entries(AVAILABLE_COUNTRIES).forEach(([code, name]) => {
                    countriesText += `• ${name} (${code})\n`;
                });
                await sock.sendMessage(message.from, { text: countriesText });
                break;
                
            case 'services':
                let servicesText = '📱 Available Services:\n\n';
                Object.entries(AVAILABLE_SERVICES).forEach(([code, name]) => {
                    servicesText += `• ${name} (${code})\n`;
                });
                await sock.sendMessage(message.from, { text: servicesText });
                break;
                
            case 'get':
            case 'generate':
                if (args.length < 3) {
                    return await sock.sendMessage(message.from, { 
                        text: 'Usage: .otp get <country_code> <service>\nExample: .otp get US whatsapp\n\nUse .otp countries and .otp services to see available options.' 
                    });
                }
                
                const countryCode = args[1].toUpperCase();
                const service = args[2].toLowerCase();
                
                // Validate country
                if (!AVAILABLE_COUNTRIES[countryCode]) {
                    return await sock.sendMessage(message.from, { 
                        text: `❌ Invalid country code. Use .otp countries to see available countries.` 
                    });
                }
                
                // Validate service
                if (!AVAILABLE_SERVICES[service]) {
                    return await sock.sendMessage(message.from, { 
                        text: `❌ Invalid service. Use .otp services to see available services.` 
                    });
                }
                
                // Clear any existing session
                otpFetcher.clearSession(userId);
                
                // Create loading message
                await sock.sendMessage(message.from, { 
                    text: `⏳ Generating ${AVAILABLE_SERVICES[service]} number for ${AVAILABLE_COUNTRIES[countryCode]}...` 
                });
                
                // Create session
                const result = await otpFetcher.createSession(userId, countryCode, service);
                
                if (result.error) {
                    return await sock.sendMessage(message.from, { text: `❌ Error: ${result.error}` });
                }
                
                // Send success message
                await sock.sendMessage(message.from, { 
                    text: result.message + `\n\nUse .otp check to check for OTP\nUse .otp auto for auto-check (every 10s)\nUse .otp status to see current status` 
                });
                
                // Start auto-check
                otpFetcher.startAutoCheck(userId, async (otpResult) => {
                    await sock.sendMessage(message.from, { text: otpResult.message });
                });
                break;
                
            case 'check':
                const checkResult = await otpFetcher.checkUserOTP(userId);
                
                if (checkResult.error) {
                    return await sock.sendMessage(message.from, { text: `❌ ${checkResult.error}` });
                }
                
                await sock.sendMessage(message.from, { text: checkResult.message });
                break;
                
            case 'auto':
                const session = otpFetcher.getUserSession(userId);
                if (!session) {
                    return await sock.sendMessage(message.from, { 
                        text: '❌ No active OTP session. Use .otp get first.' 
                    });
                }
                
                if (session.checkInterval) {
                    otpFetcher.stopAutoCheck(userId);
                    await sock.sendMessage(message.from, { text: '🛑 Auto-check stopped.' });
                } else {
                    otpFetcher.startAutoCheck(userId, async (otpResult) => {
                        await sock.sendMessage(message.from, { text: otpResult.message });
                    });
                    await sock.sendMessage(message.from, { 
                        text: `✅ Auto-check started!\n📱 Checking ${session.phoneNumber} every 10 seconds...\n📱 Service: ${session.service}\n\nI will notify you when OTP arrives!` 
                    });
                }
                break;
                
            case 'status':
                const userSession = otpFetcher.getUserSession(userId);
                if (!userSession) {
                    return await sock.sendMessage(message.from, { 
                        text: '❌ No active OTP session. Use .otp get first.' 
                    });
                }
                
                const statusText = `📱 OTP Session Status:\n\n` +
                                 `📞 Number: ${userSession.phoneNumber}\n` +
                                 `🌍 Country: ${userSession.country}\n` +
                                 `📱 Service: ${userSession.service}\n` +
                                 `📊 Status: ${userSession.status === 'received' ? '✅ OTP Received' : '⏳ Waiting for OTP'}\n` +
                                 (userSession.otp ? `🔑 OTP: ${userSession.otp}\n` : '') +
                                 `🕐 Created: ${new Date(userSession.createdAt).toLocaleTimeString()}\n` +
                                 (userSession.checkInterval ? `🔄 Auto-check: ✅ Enabled\n` : `🔄 Auto-check: ❌ Disabled\n`) +
                                 `\nCommands:\n• .otp check - Check for OTP\n• .otp auto - Toggle auto-check\n• .otp clear - Clear session`;
                
                await sock.sendMessage(message.from, { text: statusText });
                break;
                
            case 'clear':
            case 'stop':
                const cleared = otpFetcher.clearSession(userId);
                if (cleared) {
                    await sock.sendMessage(message.from, { text: '✅ OTP session cleared.' });
                } else {
                    await sock.sendMessage(message.from, { text: '❌ No active session to clear.' });
                }
                break;
                
            case 'recent':
            case 'history':
                const allSessions = otpFetcher.getAllSessions();
                if (Object.keys(allSessions).length === 0) {
                    return await sock.sendMessage(message.from, { text: '📭 No active OTP sessions.' });
                }
                
                let historyText = '📋 Active OTP Sessions:\n\n';
                Object.entries(allSessions).forEach(([user, sessionData], index) => {
                    const userShort = user.split('@')[0];
                    historyText += `${index + 1}. ${userShort}\n`;
                    historyText += `   📱 ${sessionData.phoneNumber}\n`;
                    historyText += `   📱 ${sessionData.service}\n`;
                    historyText += `   📊 ${sessionData.status === 'received' ? '✅ OTP Received' : '⏳ Waiting'}\n`;
                    if (sessionData.otp) {
                        historyText += `   🔑 OTP: ${sessionData.otp}\n`;
                    }
                    historyText += '\n';
                });
                
                await sock.sendMessage(message.from, { text: historyText });
                break;
                
            case 'test':
                // Test connection to OTP service
                await sock.sendMessage(message.from, { text: '🔍 Testing connection to OTP service...' });
                
                try {
                    const countries = await otpFetcher.getCountries();
                    if (countries && countries.length > 0) {
                        await sock.sendMessage(message.from, { 
                            text: `✅ Connection successful!\n🌍 Available countries: ${countries.length}` 
                        });
                    } else {
                        await sock.sendMessage(message.from, { 
                            text: '⚠️ Connection successful but no countries found.' 
                        });
                    }
                } catch (error) {
                    await sock.sendMessage(message.from, { 
                        text: `❌ Connection failed: ${error.message}` 
                    });
                }
                break;
                
            default:
                const helpText = `🔐 OTP Fetcher Commands:\n\n` +
                               `🌍 .otp countries - Show available countries\n` +
                               `📱 .otp services - Show available services\n` +
                               `🔄 .otp get <country> <service> - Get fake number\n` +
                               `📥 .otp check - Check for OTP\n` +
                               `🔄 .otp auto - Toggle auto-check (10s intervals)\n` +
                               `📊 .otp status - Check session status\n` +
                               `🧹 .otp clear - Clear current session\n` +
                               `📋 .otp recent - Show active sessions\n` +
                               `🔍 .otp test - Test connection\n\n` +
                               `📝 Examples:\n` +
                               `• .otp get US whatsapp\n` +
                               `• .otp get IN telegram\n` +
                               `• .otp get GB google\n\n` +
                               `⚠️ Note: This uses temporary numbers for testing only.`;
                
                await sock.sendMessage(message.from, { text: helpText });
        }
    }
};
  

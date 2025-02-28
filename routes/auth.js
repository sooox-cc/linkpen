const express = require('express');
const router = express.Router();
const { rootDomain, siteTitle, discordInvite, isPublic } = require('../global-variables.json');
const { version } = require('../package.json');
const { generateCSRFToken } = require('../middleware/security');

// Add the generateCSRFToken middleware to all routes
router.use(generateCSRFToken);

// Login page
router.get('/login', (req, res) => {
    if (req.session.user) {
        return res.redirect(`/${req.session.user.username}`);
    }
    res.render('pages/auth/login', {
        siteTitle,
        version,
        rootDomain,
        isPublic,
        discordInvite
    });
});

// Register page
router.get('/register', (req, res) => {
    if (req.session.user) {
        return res.redirect(`/${req.session.user.username}`);
    }
    // Redirect to login if registrations are disabled
    if (!isPublic) {
        return res.redirect('/login');
    }

    res.render('pages/auth/register', {
        siteTitle,
        version,
        rootDomain,
        isPublic,
        discordInvite
    });
});

router.get('/terms', (req, res) => {
    res.render('pages/terms', {
        siteTitle,
        version,
        rootDomain,
        isPublic,
        discordInvite
    });
});

router.get('/privacy', (req, res) => {
    res.render('pages/privacy', {
        siteTitle,
        version,
        rootDomain,
        isPublic,
        discordInvite
    });
});

module.exports = router;  // Make sure this line exists and is at the end
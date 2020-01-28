const sanitizeHtml = require('sanitize-html')

module.exports = (req, reply, next) => {
  const sanitizeOptions = {
    template: {
      allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol',
        'li', 'b', 'i', 'strong', 'em', 'strike', 'hr', 'br', 'div',
        'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'iframe', 'img'
      ],
      allowedAttributes: {
        a: [ 'href', 'name', 'target' ],
        iframe: ['src'],
        // We don't currently allow img itself by default, but this
        // would make sense if we did. You could add srcset here,
        // and if you do the URL is checked for safety
        img: [ 'src' ]
      },
      allowedIframeHostnames: ['www.youtube.com', 'player.vimeo.com'],
      selfClosing: [ 'img', 'br', 'hr', 'area', 'base', 'basefont', 'input', 'link', 'meta' ],
      // URL schemes we permit
      allowedSchemes: [ 'http', 'https', 'mailto' ],
      allowedSchemesAppliedToAttributes: [ 'href', 'src', 'cite' ],
      allowProtocolRelative: true
    }
  }

  Object.keys(sanitizeOptions).forEach(key => {
    if (req.body[key]) {
      req.body[key] = sanitizeHtml(req.body[key], sanitizeOptions[key])

      // sanitizer can clear content for <script>alert('wtf')</script> or similar constructions
      if (!req.body[key]) {
        return next({ validation: true, message: 'Content not allowed' })
      }
    }
  })
  return next()
}
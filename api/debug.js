module.exports = async function handler(req, res) {
  return res.status(200).json({
    nodeVersion: process.version,
    envKeys: Object.keys(process.env),
    hasGeminiKey: !!process.env.GEMINI_API_KEY
  });
}

import React, { useState, useEffect } from "react";

const PixelSettings = () => {
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const [facebookPixelId, setFacebookPixelId] = useState("");
  const [customScript, setCustomScript] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const savedSettings = {
      googleAnalyticsId: "UA-12345678-9",
      facebookPixelId: "123456789012345",
      customScript: "<script>console.log('Hello')</script>",
    };
    setGoogleAnalyticsId(savedSettings.googleAnalyticsId);
    setFacebookPixelId(savedSettings.facebookPixelId);
    setCustomScript(savedSettings.customScript);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    if (
      googleAnalyticsId.trim() === "" &&
      facebookPixelId.trim() === "" &&
      customScript.trim() === ""
    ) {
      alert("Please enter at least one pixel or custom script.");
      return;
    }


    setSavedMessage("Settings saved successfully!");
    setTimeout(() => setSavedMessage(""), 3000);
  };

  return (
    <div className="container my-4">
      <h2>Pixel & Analytics Settings</h2>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label htmlFor="googleAnalytics" className="form-label">
            Google Analytics Tracking ID
          </label>
          <input
            type="text"
            id="googleAnalytics"
            className="form-control"
            placeholder="e.g. UA-12345678-9"
            value={googleAnalyticsId}
            onChange={(e) => setGoogleAnalyticsId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="facebookPixel" className="form-label">
            Facebook Pixel ID
          </label>
          <input
            type="text"
            id="facebookPixel"
            className="form-control"
            placeholder="e.g. 123456789012345"
            value={facebookPixelId}
            onChange={(e) => setFacebookPixelId(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="customScript" className="form-label">
            Custom Analytics Script / Other Pixels
          </label>
          <textarea
            id="customScript"
            className="form-control"
            rows="4"
            placeholder="Paste any custom scripts here"
            value={customScript}
            onChange={(e) => setCustomScript(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Save Settings
        </button>

        {savedMessage && (
          <div className="alert alert-success mt-3" role="alert">
            {savedMessage}
          </div>
        )}
      </form>
    </div>
  );
};

export default PixelSettings;

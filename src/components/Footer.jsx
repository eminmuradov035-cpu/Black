import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LogoMark } from "./Icons";

const Footer = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");

  const col = (titleKey, keys) => (
    <div>
      <h3 className="text-xs font-semibold tracking-wider text-gray-400 uppercase mb-4">
        {t(titleKey)}
      </h3>
      <ul className="space-y-2.5 text-sm text-gray-300">
        {keys.map((k) => (
          <li key={k}>
            <a href="#footer" className="hover:text-white no-underline transition-colors duration-700 ease-in-out">
              {t(k)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer id="footer" className="mt-auto border-t border-gray-800 bg-[#2a2a2a] text-white dark:bg-[#1a1a1a]">
      <div className="border-b border-gray-700/80 bg-gray-200 py-6 dark:bg-gray-800">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale">
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t("footer.partner1")}</span>
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t("footer.partner2")}</span>
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t("footer.partner3")}</span>
          <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">{t("footer.partner4")}</span>
        </div>
      </div>

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 py-14">
        <div className="flex flex-col items-center text-center mb-14">
          <div className="text-white mb-4">
            <LogoMark className="w-10 h-10 mx-auto" />
          </div>
          <h2 className="text-lg sm:text-xl font-medium text-white max-w-xl leading-snug mb-6">
            {t("footer.newsletterTitle")}
          </h2>
          <form
            className="flex w-full max-w-md gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setEmail("");
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("footer.emailPlaceholder")}
              className="flex-1 h-12 px-4 rounded-full border border-gray-600 bg-[#333] text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
            <button
              type="submit"
              className="shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:bg-gray-900 transition-all duration-700 ease-in-out"
              aria-label={t("footer.subscribe")}
            >
              <span aria-hidden className="text-lg">
                →
              </span>
            </button>
          </form>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 md:gap-8 pb-10 border-b border-gray-700">
          {col("footer.colProducts", [
            "footer.linkSofas",
            "footer.linkTables",
            "footer.linkChairs",
            "footer.linkBeds",
          ])}
          {col("footer.colCategories", [
            "footer.linkLiving",
            "footer.linkBedroom",
            "footer.linkKitchen",
            "footer.linkOffice",
          ])}
          {col("footer.colResources", [
            "footer.linkBlog",
            "footer.linkGuides",
            "footer.linkFaq",
            "footer.linkCare",
          ])}
          {col("footer.colCompany", [
            "footer.linkAbout",
            "footer.linkCareers",
            "footer.linkPress",
            "footer.linkContact",
          ])}
          {col("footer.colSupport", [
            "footer.linkShipping",
            "footer.linkReturns",
            "footer.linkPrivacy",
            "footer.linkTerms",
          ])}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>{t("footer.copyright")}</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-gray-300 no-underline transition-colors duration-700 ease-in-out">
              {t("layout.home")}
            </Link>
            <Link to="/login" className="hover:text-gray-300 no-underline transition-colors duration-700 ease-in-out">
              {t("layout.login")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

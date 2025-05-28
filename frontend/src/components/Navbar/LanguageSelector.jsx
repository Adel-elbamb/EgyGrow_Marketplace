import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCurrentLang } from "../../redux/slices/languageSlice";
import styles from "./Navbar.module.css";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ar", label: "العربية", flag: "🇪🇬" },
];

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.language.currentLang);
  const [open, setOpen] = useState(false);
  const selectorRef = useRef(null);

  const selectedLang = languages.find((lang) => lang.code === currentLang);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleChangeLanguage = (langCode) => {
    dispatch(updateCurrentLang(langCode));
    setOpen(false);
  };

  return (
    <div className={styles.languageDropdown} ref={selectorRef}>
      <button
        className={styles.languageButton}
        onClick={() => setOpen(!open)}
        type="button"
      >
        <span className={styles.flag}>{selectedLang.flag}</span> {selectedLang.label} ▼
      </button>
      {open && (
        <ul className={styles.languageList}>
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleChangeLanguage(lang.code)}
              className={styles.languageOption}
            >
              <span className={styles.flag}>{lang.flag}</span> {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSelector;

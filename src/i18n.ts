import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

const resources = {
	en: {
		translation: {
			nav: {
				home: "[Home]",
				projects: "[Projects]",
				blog: "[Blog]",
				terminal: "[Terminal]",
				admin: "[Admin]",
			},
			seo: {
				site_name: "Portfolio",
				default_title: "Fullstack Developer",
				default_description:
					"Fullstack developer passionate about building efficient, scalable, and minimalist software. Specialist in React and TypeScript.",
				home_title: "Home",
				projects_title: "Projects",
				blog_title: "Blog",
				admin_title: "Admin",
				error_404_title: "Page Not Found",
				error_500_title: "Internal Server Error",
			},
			common: {
				loading: "Loading_Data...",
				searching: "Searching_Articles...",
				read_more: "READ_MORE",
				back: "BACK",
				save: "SAVE",
				delete: "DELETE",
				cancel: "CANCEL",
				edit: "EDIT",
			},
			terminal: {
				welcome: "Welcome to DEV_TERMINAL v3.2.1",
				help_hint: 'Type "help" to see available commands.',
				features:
					"Supports: [UP/DOWN] History, [TAB] Autocomplete, [LANG] switch",
				lang_switched: "Language switched to English",
				moon_1: "NEW MOON",
				moon_2: "WAXING CRESCENT",
				moon_3: "FIRST QUARTER",
				moon_4: "WAXING GIBBOUS",
				moon_5: "FULL MOON",
				moon_6: "WANING GIBBOUS",
				moon_7: "LAST QUARTER",
				moon_8: "WANING CRESCENT",
			},
			admin: {
				dashboard: "ADMIN_DASHBOARD",
				login: "login --admin",
				password: "Enter_Password:",
				projects: "Projects",
				blog: "Blog",
				draft: "Mark_as_Draft",
				translate: "Translate to EN",
				correct: "Correct (FR)",
			},
		},
	},
	fr: {
		translation: {
			nav: {
				home: "[Accueil]",
				projects: "[Projets]",
				blog: "[Blog]",
				terminal: "[Terminal]",
				admin: "[Admin]",
			},
			seo: {
				site_name: "Portfolio",
				default_title: "Développeur Fullstack",
				default_description:
					"Développeur fullstack passionné par la création de logiciels efficaces, évolutifs et minimalistes. Spécialiste React et TypeScript.",
				home_title: "Accueil",
				projects_title: "Projets",
				blog_title: "Blog",
				admin_title: "Admin",
				error_404_title: "Page Introuvable",
				error_500_title: "Erreur Serveur",
			},
			common: {
				loading: "Chargement_Données...",
				searching: "Recherche_Articles...",
				read_more: "LIRE_PLUS",
				back: "RETOUR",
				save: "SAUVEGARDER",
				delete: "SUPPRIMER",
				cancel: "ANNULER",
				edit: "ÉDITER",
			},
			terminal: {
				welcome: "Bienvenue sur DEV_TERMINAL v3.1.0",
				help_hint: 'Tapez "help" pour voir les commandes.',
				features:
					"Supporte: [HAUT/BAS] Historique, [TAB] Auto-complétion, [LANG] changement",
				lang_switched: "Langue changée en Français",
				moon_1: "NOUVELLE LUNE",
				moon_2: "CROISSANT",
				moon_3: "PREMIER QUART",
				moon_4: "LUNE GIBBEUSE CROISSANTE",
				moon_5: "PLEINE LUNE",
				moon_6: "LUNE GIBBEUSE DÉCROISSANTE",
				moon_7: "DERNIER QUART",
				moon_8: "CROISSANT DÉCROISSANT",
			},
			admin: {
				dashboard: "TABLEAU_DE_BORD_ADMIN",
				login: "connexion --admin",
				password: "Entrez_le_mot_de_passe :",
				projects: "Projets",
				blog: "Blog",
				draft: "Marquer_comme_Brouillon",
				translate: "Traduire en EN",
				correct: "Corriger (FR)",
			},
		},
	},
};

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources,
		fallbackLng: "fr",
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;

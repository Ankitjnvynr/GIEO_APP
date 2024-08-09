import AsyncStorage from "@react-native-async-storage/async-storage";
import { getTranslations, saveLangCode, setIsLoading } from "../redux/actions";

const { useSelector, useDispatch } = require("react-redux");

export const useTranslation = () => {
    const dispatch = useDispatch();

    const Translation = useSelector(state => state.AppReducers.translationData);
    const selectedLang = useSelector(state => state.AppReducers.selectedLangCode);
    const isLoading = useSelector(state => state.AppReducers.isLoading);

    const handleUpdateLanuage = (params) => {
        dispatch(getTranslations(params));
    }

    const handleSelectedLanguage = async (data) => {
        await AsyncStorage.setItem('currentLang', JSON.stringify(data))
        dispatch(saveLangCode(data));
    }

    const handleDefaultLanguage = async () => {
        const lang = await AsyncStorage.getItem('currentLang')
        const prevLang = JSON.parse(lang)
        return prevLang ? prevLang : selectedLang
    }

    const handleLoader = (isTrue) => {
        dispatch(setIsLoading(isTrue))
    }

    const getFormatedString = (template, data) => {
        if (template) {
            Object.entries(data).forEach(([key, value]) => {
                template = template.replace(`{${key}}`, value);
            });
        } return template;
    };

    return {
        Translation,
        handleUpdateLanuage,
        selectedLang,
        handleSelectedLanguage,
        handleDefaultLanguage,
        isLoading,
        handleLoader,
        getFormatedString
    }
}
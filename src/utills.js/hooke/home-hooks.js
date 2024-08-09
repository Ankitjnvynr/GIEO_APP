import { getHomeData, setHomePageHtmlUrl } from "../../redux/actions";
import { useTranslation } from "../translation-hook";

const { useSelector, useDispatch } = require("react-redux");

export const useHomeHooks = () => {
    const dispatch = useDispatch();
    const { Translation } = useTranslation()

    const homePageData = useSelector(state => state.AppReducers.homePageData);
    const isLoading = useSelector(state => state.AppReducers.isLoading);


    const handleGetHomeData = () => {
        dispatch(getHomeData());
    }

    const saveHtmlUrlAction = (url) => {
        dispatch(setHomePageHtmlUrl(url));
    }

    return {
        handleGetHomeData,
        homePageData,
        Translation,
        isLoading,
        saveHtmlUrlAction
    }
}
import { Trans, useTranslation } from 'react-i18next';

const useCustomTranslation = () => {
  const { t, i18n } = useTranslation();
  return { t, i18n, Trans };
};
export default useCustomTranslation;

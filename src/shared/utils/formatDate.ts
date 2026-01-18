import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

export const formatDate = (date: string | Date): string => {
  return dayjs(date).format('DD.MM.YYYY HH:mm');
};
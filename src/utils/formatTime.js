import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateString(date) {
  return format(new Date(date), 'yyyyMMdd');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fDateKr(date) {
  return date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1-$2-$3');
}

export function fTimeShorten(date) {
  return date.slice(8, date.length).replace(/^(\d{2})(\d{2})(\d{2})$/, '$1:$2:$3');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

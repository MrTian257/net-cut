import dayjs from "dayjs";
import type {Dayjs} from "dayjs";
import 'dayjs/locale/zh-cn'
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.locale('zh-cn')

dayjs.extend(relativeTime)

export const fromNow = (time: string | number | Date | Dayjs | null | undefined) => {
    return dayjs().fromNow()
}
export const format = (time: string | number | Date | Dayjs | null | undefined) => {
    return dayjs().format('HH:mm')
}
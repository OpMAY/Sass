package com.util;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;
import java.util.Objects;

import static com.util.Constant.*;

/**
 * Time에 관련된 Class
 */
public class Time {

    /**
     * @return 현재 시간 FORM에 맞춰 리턴
     * "yyyy-MM-dd HH:mm:ss"
     * "yyyy년 MM월dd일 HH시mm분ss초"
     * "yyyy_MM_dd_HH_mm_ss"
     */
    public static String TimeFormatter(String format) {
        String basicFormat = "yyyy-MM-dd HH:mm:ss";
        Date now = new Date();
        DateFormat dateFormat = new SimpleDateFormat(Objects.isNull(format) ? basicFormat : format);
        return dateFormat.format(now);
    }

    public static String TimeFormatterLongToString(String format, long time) {
        DateFormat dateFormat = new SimpleDateFormat(format, Locale.KOREA);
        return dateFormat.format(time);
    }

    public static String TimeFormatterStringToString(String from_format, String to_format, String time) throws ParseException {
        DateFormat from_dateFormat = new SimpleDateFormat(from_format);
        Date target_date = from_dateFormat.parse(time);
        DateFormat to_dateFormat = new SimpleDateFormat(to_format, Locale.KOREA);
        return to_dateFormat.format(target_date);
    }

    public static Date DateStringToDate(String date, String format) throws ParseException {
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        return formatter.parse(date);
    }

    public static Long LocalDataTimeToLong(LocalDateTime datetime) {
        System.out.println("year : " + datetime.getYear());
        System.out.println("month : " + (datetime.getMonthValue() - 1));
        System.out.println("day : " + datetime.getDayOfMonth());
        System.out.println("hour : " + datetime.getHour());
        System.out.println("minute : " + datetime.getSecond());
        int year = datetime.getYear();
        int month = datetime.getMonthValue() - 1;
        int day = datetime.getDayOfMonth();
        int hour = datetime.getHour();
        int minute = datetime.getMinute();
        int second = datetime.getSecond();
        return new Date(year, month, day, hour, minute, second).getTime();

    }

    /**
     * @return 현재 시간 + 1day를 늘려서 Stamp로 리턴
     * 현재 Stamp에서 하루를 늘린 Stamp
     */
    public static Date LongTimeStamp() {
        Date currentDate = new Date();
        // convert date to calendar
        Calendar c = Calendar.getInstance();
        c.setTime(currentDate);
        // manipulate date
        c.add(Calendar.YEAR, 0);
        c.add(Calendar.MONTH, 0);
        c.add(Calendar.DATE, 1); //same with c.add(Calendar.DAY_OF_MONTH, 1);
        c.add(Calendar.HOUR, 0);
        c.add(Calendar.MINUTE, 0);
        c.add(Calendar.SECOND, 0);
        // convert calendar to date
        Date currentDatePlusOne = c.getTime();
        return currentDatePlusOne;
    }

    /**
     * @return 현재 시간 + i day를 늘려서 Stamp로 리턴
     * 현재 Stamp에서 i day를 늘린 Stamp
     */
    public static Date LongTimeStamp(int i) {
        Date currentDate = new Date();
        // convert date to calendar
        Calendar c = Calendar.getInstance();
        c.setTime(currentDate);
        // manipulate date
        c.add(Calendar.YEAR, 0);
        c.add(Calendar.MONTH, 0);
        c.add(Calendar.DATE, i); //same with c.add(Calendar.DAY_OF_MONTH, 1);
        c.add(Calendar.HOUR, 0);
        c.add(Calendar.MINUTE, 0);
        c.add(Calendar.SECOND, 0);
        // convert calendar to date
        Date currentDatePlusOne = c.getTime();
        return currentDatePlusOne;
    }

    /**
     * @return 임의의 Date에 + i day를 늘려서 Stamp로 리턴
     * 임의의 Stamp에서 i day를 늘린 Stamp
     */
    public static Date LongTimeStamp(Date date, int i) {
        Date currentDate = date;
        // convert date to calendar
        Calendar c = Calendar.getInstance();
        c.setTime(currentDate);
        // manipulate date
        c.add(Calendar.YEAR, 0);
        c.add(Calendar.MONTH, 0);
        c.add(Calendar.DATE, i); //same with c.add(Calendar.DAY_OF_MONTH, 1);
        c.add(Calendar.HOUR, 0);
        c.add(Calendar.MINUTE, 0);
        c.add(Calendar.SECOND, 0);
        // convert calendar to date
        Date currentDatePlusOne = c.getTime();
        return currentDatePlusOne;
    }

    /**
     * @return Time에 관한 String을 리턴
     * 받은 long 타입의 시간과 현재 시간을 비교해서 얼마나 차이가 있을까 text로 표현하는 함수
     */
    public static String formatTimePastToString(long regTime) throws ParseException {
        long curTime = System.currentTimeMillis();
        long diffTime = (curTime - regTime) / 1000;
        String msg;
        if (diffTime < SEC) {
            msg = "방금 전";
        } else if ((diffTime /= SEC) < MIN) {
            msg = diffTime + "분 전";
        } else if ((diffTime /= MIN) < HOUR) {
            msg = (diffTime) + "시간 전";
        } else if ((diffTime /= HOUR) < DAY) {
            msg = (diffTime) + "일 전";
        } else if ((diffTime /= DAY) < MONTH) {
            msg = (diffTime) + "달 전";
        } else {
            msg = TimeFormatterLongToString("MM월 dd일(E) a HH:mm", regTime);
        }
        return msg;
    }

    /**
     * const time_gap = new Date().getTime() - this.getLocalDateTime(datetime);
     * if (time_gap < 1000 * 60) { // 1분 이내
     * return '방금 전';
     * } else if (time_gap < 1000 * 60 * 60) { // 60분 이내
     * return Math.floor(time_gap / (1000 * 60)) + '분 전';
     * } else if (time_gap < 1000 * 60 * 60 * 24) { // 24시간 이내
     * return Math.floor(time_gap / (1000 * 60 * 60)) + '시간 전';
     * } else if (time_gap < 1000 * 60 * 60 * 24 * datetime.dayOfMonth) { //한달 이내
     * return Math.floor(time_gap / (1000 * 60 * 60 * 24)) + '일 전';
     * } else if (time_gap < 1000 * 60 * 60 * 24 * 365) {
     * return Math.floor(time_gap / (1000 * 60 * 60 * 24 * 30)) + '달 전';
     * } else if (time_gap < 1000 * 60 * 60 * 24 * 365 * 10) {
     * return Math.floor(time_gap / (1000 * 60 * 60 * 24 * 365)) + '년 전';
     * } else {
     * return this.formatLocalDate(datetime);
     * }
     */
    public static String formatChatDateTime(LocalDateTime time) throws ParseException {
        LocalDateTime now = LocalDateTime.now();
        long diffTime = time.until(now, ChronoUnit.SECONDS); // now보다 이후면 +, 전이면 -
        String msg = null;
        if (diffTime < SEC) {
            return diffTime + "초전";
        }
        diffTime = diffTime / SEC;
        if (diffTime < MIN) {
            return diffTime + "분 전";
        }
        diffTime = diffTime / MIN;
        if (diffTime < HOUR) {
            return diffTime + "시간 전";
        }
        diffTime = diffTime / HOUR;
        if (diffTime < DAY) {
            return diffTime + "일 전";
        }
        diffTime = diffTime / DAY;
        if (diffTime < MONTH) {
            return diffTime + "개월 전";
        }

        diffTime = diffTime / MONTH;
        return diffTime + "년 전";
    }

    public static long getDateSecondDiff(Date date1, Date date2) {
        return date2.getTime() - date1.getTime() / 1000;
    }

    public static long getDateMinuteDiff(Date date1, Date date2) {
        return date2.getTime() - date1.getTime() / 60000;
    }

    public static long getDateHourDiff(Date date1, Date date2) {
        return date2.getTime() - date1.getTime() / 3600000;
    }
}

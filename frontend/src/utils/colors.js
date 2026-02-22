export function getWeekendColor(dayOfWeek, isDark) {
    if (dayOfWeek === 0) {
        return isDark ? 'rgb(251 113 133)' : 'rgb(225 29 72)';
    }
    if (dayOfWeek === 6) {
        return isDark ? 'rgb(96 165 250)' : 'rgb(37 99 235)';
    }
    return isDark ? 'rgb(148 163 184)' : 'rgb(71 85 105)';
}

export function getDateColor(dayOfWeek, isDark) {
    if (dayOfWeek === 0) {
        return isDark ? 'rgb(251 113 133)' : 'rgb(225 29 72)';
    }
    if (dayOfWeek === 6) {
        return isDark ? 'rgb(96 165 250)' : 'rgb(37 99 235)';
    }
    return isDark ? 'rgb(226 232 240)' : 'rgb(51 65 85)';
}

/**
 *
 * @param {string} notification
 */
export function getNotificationMentions(notification) {
    let regex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi;
    let matches = notification.match(regex);
    return matches || [];
}

import event from 'events'
import { Event_ENUM } from '../constants/event';
import { analyticsService } from '../routes/analyticsRoute';

class AnalyticsEvent extends event { }

export const analyticsEvent = new AnalyticsEvent();

analyticsEvent.on(Event_ENUM.CLICK_URL, async (data) => {
    await analyticsService.createAnalytics(data);
});

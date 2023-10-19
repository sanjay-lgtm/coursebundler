import { catchAsyncError } from "../Middleware/catchAsyncError.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import { sendEmail } from "../utils/sendmail.js";
import { States } from "../Modals/States.js";
export const contact = catchAsyncError(async (req, res, next) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message)
    return next(new ErrorHandler("Please Enter all fiels", 400));
  const to = process.env.MY_MAIL;
  const subject = "Contact from Heaven";
  const text = `I am ${name} and my Email is ${email}. \n${message}`;
  await sendEmail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your message has been Sent.",
  });
});

export const courseRequest = catchAsyncError(async (req, res, next) => {
  const { name, email, course } = req.body;
  if (!name || !email || !course)
    return next(new ErrorHandler("Please Enter all fiels", 400));
  const to = process.env.MY_MAIL;
  const subject = "Request for a Course from CourseBundler";
  const text = `I am ${name} and my Email is ${email}. \n${course}`;
  await sendEmail(to, subject, text);
  res.status(200).json({
    success: true,
    message: "Your Request has been Sent.",
  });
});

export const getDashboardStats = catchAsyncError(async (req, res, next) => {
  const stats = await States.find({}).sort({ createdAt: "desc" }).limit(12);
  const statsData = [];

  for (let i = 0; i < stats.length; i++) {
    statsData.push(stats[i]);
  }
  const requiredSize = 12 - stats.length;

  for (let i = 0; i < requiredSize; i++) {
    statsData.unshift({
      users: 0,
      subscription: 0,
      views: 0,
    });
  }

  const usersCount = statsData[11].users;
  const subscriptionCount = statsData[11].subscription;
  const viewsCount = statsData[11].views;

  let userPercentage = 0,
    viewsPercentage = 0,
    subscriptionPercentage = 0;

  let userProfit = true,
    viewsProfit = true,
    subscriptionProfit = true;

  if (statsData[10].users === 0) userPercentage = usersCount * 100;
  if (statsData[10].subscription === 0)
    subscriptionPercentage = subscriptionCount * 100;
  if (statsData[10].views === 0) viewsPercentage = viewsCount * 100;
  else {
    const difference = {
      users: statsData[11].users - statsData[10].users,
      subscription: statsData[11].subscription - statsData[10].subscription,
      views: statsData[11].views - statsData[10].views,
    };

    userPercentage = (difference.users / statsData[10].users) * 100;
    subscriptionPercentage =
      (difference.subscription / statsData[10].subscription) * 100;
    viewsPercentage = (difference.views / statsData[10].views) * 100;
    if (userPercentage < 0) userProfit = false;
    if (subscriptionPercentage < 0) subscriptionProfit = false;

    if (viewsPercentage < 0) viewsProfit = false;
  }

  res.status(200).json({
    success: true,
    stats: statsData,
    usersCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    userPercentage,
    viewsPercentage,
    userProfit,
    viewsProfit,
    subscriptionProfit,
  });
});

import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";

export const links = [
  {
    title: "Home",
    Logo: HouseOutlinedIcon,
    path: "/",
  },
  {
    title: "Explore",
    Logo: CollectionsOutlinedIcon,
    path: "/explore",
  },
  {
    title: "People",
    Logo: GroupOutlinedIcon,
    path: "/all-users",
  },
  {
    title: "Saved",
    Logo: BookmarkBorderOutlinedIcon,
    path: "/saved",
  },
  {
    title: "Create Post",
    Logo: AddBoxOutlinedIcon,
    path: "/create-post",
  },
];

export const getCurrentPage = () => {
  const currPath = window.location.pathname;

  const matchingLink = links.find((link) => link.path === currPath);

  return matchingLink ? matchingLink.title : currPath;
};

export const timeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "week", seconds: 604800 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
};

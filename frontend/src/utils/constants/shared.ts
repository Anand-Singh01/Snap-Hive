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
    { label: "y", seconds: 31536000 },
    { label: "m", seconds: 2592000 },
    { label: "w", seconds: 604800 },
    { label: "d", seconds: 86400 },
    { label: "h", seconds: 3600 },
    { label: "min", seconds: 60 },
    { label: "sec", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "" : ""}`;
    }
  }

  return "just now";
};

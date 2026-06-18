import {
  Bell,
} from "lucide-react";

function NotificationBell({

  unreadCount,

  onClick,

}) {

  return (

    <button
      onClick={onClick}
      className="
        relative

        w-12
        h-12

        rounded-2xl

        border
        border-border

        bg-white

        flex
        items-center
        justify-center

        transition-all
        duration-200

        hover:bg-stone
      "
    >

      <Bell
        size={20}
        className="
          text-primary
        "
      />

      {unreadCount > 0 && (

        <span
          className="
            absolute

            -top-1
            -right-1

            min-w-[22px]
            h-[22px]

            px-1

            rounded-full

            bg-accent
            text-white

            text-[11px]
            font-semibold

            flex
            items-center
            justify-center
          "
        >

          {unreadCount > 99

            ? "99+"

            : unreadCount}

        </span>

      )}

    </button>
  );
}

export default NotificationBell;
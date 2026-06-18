import {
  Link,
} from "react-router-dom";

import {
  ArrowLeft,
  Home,
  SearchX,
} from "lucide-react";

import Button
from "../../components/ui/Button";

function NotFoundPage() {

  return (

    <div
      className="
        min-h-screen

        bg-stone

        flex
        items-center
        justify-center

        px-6
      "
    >

      <div
        className="
          max-w-xl
          w-full

          bg-white

          border
          border-border

          rounded-[36px]

          p-10

          text-center

          shadow-sm
        "
      >

        {/* ICON */}

        <div
          className="
            mx-auto

            w-24
            h-24

            rounded-full

            bg-blue-50

            flex
            items-center
            justify-center
          "
        >

          <SearchX
            size={42}
            className="
              text-accent
            "
          />

        </div>

        {/* 404 */}

        <h1
          className="
            mt-8

            text-6xl

            font-bold

            text-primary
          "
        >

          404

        </h1>

        {/* TITLE */}

        <h2
          className="
            mt-4

            text-2xl

            font-semibold

            text-primary
          "
        >

          Page Not Found

        </h2>

        {/* DESCRIPTION */}

        <p
          className="
            mt-4

            text-muted

            leading-relaxed
          "
        >

          The page you're looking for
          doesn't exist or may have
          been moved.

        </p>

        {/* ACTIONS */}

        <div
          className="
            mt-10

            flex
            flex-col

            sm:flex-row

            gap-4
          "
        >

          <Link
            to="/"
            className="flex-1"
          >

            <Button
              className="
                w-full
                h-12
              "
            >

              <Home size={18} />

              Home

            </Button>

          </Link>

          <Button
            variant="secondary"
            className="
              flex-1
              h-12
            "
            onClick={() =>
              window.history.back()
            }
          >

            <ArrowLeft
              size={18}
            />

            Go Back

          </Button>

        </div>

      </div>

    </div>
  );
}

export default NotFoundPage;
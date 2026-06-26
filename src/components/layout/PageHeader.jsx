function PageHeader({ title, description, action }) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">

      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-primary">
          {title}
        </h1>

        {description && (
          <p className="mt-1 text-sm text-muted max-w-xl">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center gap-3 flex-wrap">
          {action}
        </div>
      )}

    </div>
  );
}

export default PageHeader;
const FormField = ({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  as = "input",
  options = [],
}: FormFieldProps) => (
  <div className="flex flex-col gap-2">
    <label 
      htmlFor={id}
      className="text-sm font-bold text-gray-700"
    >
      {label}
    </label>
    {as === "textarea" ? (
      <textarea
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 shadow-sm transition-all focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
      />
    ) : as === "select" ? (
      <select 
        id={id} 
        name={id} 
        value={value} 
        onChange={onChange}
        className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-900 shadow-sm transition-all focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-900 placeholder:text-gray-400 shadow-sm transition-all focus:border-pink-500 focus:outline-none focus:ring-4 focus:ring-pink-500/10"
      />
    )}
  </div>
);

export default FormField;
import CustomButton from "./CustomButton";

export default function FilePicker({ file, setFile, readFile }) {
  return (
    <div className="filepicker-container">
      <div className="flex-1 flex flex-col">
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])} //render the img at index=0 i.e the 1st input img file
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload a file
        </label>
        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === "" ? "No files selected" : file.name}
        </p>
      </div>

      {/* wrapper div */}
      <div className="mt-4 flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="Logo"
          handleClick={() => readFile("logo")}
          customStyles="text-xs"
        />

        <CustomButton
          type="filled"
          title="Full"
          handleClick={() => readFile("full")}
          customStyles="text-xs"
        />
      </div>
    </div>
  );
}

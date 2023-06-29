export const fileFilter = (
  req: any,
  file: any,
  callback: any,
  fileTypes: any,
) => {
  const splitFileName = file.originalname.split('.');
  if (
    splitFileName.length < 2 ||
    !fileTypes.includes(splitFileName.pop().toLowerCase())
  ) {
    req.fileValidationError = true;
    return callback(null, false);
  }
  callback(null, true);
};

export const uploadImageFilter = (req: any, file: any, callback: any) => {
  const fileTypes = [
    'png',
    'jpg',
    'jpeg',
    'svg',
    'heic',
    'doc',
    'docx',
    'ppt',
    'pptx',
    'xls',
    'xlsx',
    'pdf',
  ];
  fileFilter(req, file, callback, fileTypes);
};

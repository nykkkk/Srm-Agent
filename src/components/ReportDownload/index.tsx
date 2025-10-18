import wrapperIcon from './img/wrapper.svg'
export const ReportDownload = ({ data }) => {
  return (
    <div className="report-card report-download">
      <p className="download-description">已经为您生成一份供应商详细报告</p>

      <div className="download-card">
        <div className="file-info">
          <div className="file-icon">
            <i className="icon fa fa-file-text-o"></i>
            <img src={wrapperIcon} alt="" />
          </div>
          <div className="file-details">
            <p className="file-name">{data.filename}</p>
            <p className="file-meta">
              {data.filetype} · {data.filesize}
            </p>
          </div>
        </div>
        <button className="download-button">
          <i className="download-icon fa fa-download"></i> 下载
        </button>
      </div>
    </div>
  )
}

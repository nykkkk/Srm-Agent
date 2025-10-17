export const ReportDownload = () => {
  return (
    <div className="report-card report-download">
      <p className="download-description">已经为您生成一份供应商详细报告</p>

      <div className="download-card">
        <div className="file-info">
          <div className="file-icon">
            <i className="icon fa fa-file-text-o"></i>
          </div>
          <div className="file-details">
            <p className="file-name">深圳德胜电子科技有限公司供应商风险报告</p>
            <p className="file-meta">ASH AI 生成，仅供参考，请仔细甄别 隐私</p>
          </div>
        </div>
        <button className="download-button">
          <i className="download-icon fa fa-download"></i> 下载
        </button>
      </div>
    </div>
  )
}

// Base JavaScript for Job Board functionality
// Manages three arrays: jobs, cns, and cnd, with hierarchical rowspan structure.

const REFRESH_INTERVAL = 15000; // Refresh interval in ms; tied to setInterval

// Global arrays for data
let jobs = [];
let cns = [];
let cnd = [];

function formatDate(date) {
  if (!date || isNaN(new Date(date).getTime())) return '-';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Function to load and populate jobs
function loadJobs() {
  const errorMsg = document.getElementById('error-message');
  const lastUpdateEl = document.getElementById('last-update'); // Reference for animation

  errorMsg.style.display = 'none';
  errorMsg.textContent = '';
    
  lastUpdateEl.classList.add('refreshing'); // Change color during refresh

  fetch(`/inc/jboard.php`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (data.error) {
        errorMsg.textContent = data.error;
        errorMsg.style.display = 'block';
        lastUpdateEl.classList.remove('refreshing');
        lastUpdateEl.classList.add('error');
        return;
      }
      // Assign data to global arrays
      jobs = data.data.jobs || [];
      cns = data.data.cns || [];
      cnd = data.data.cnd || [];
      renderTable();
      lastUpdateEl.textContent = 'Last updated: ' + formatDate(data.meta?.last_updated || new Date());
      lastUpdateEl.style.setProperty('--animation-duration', `${REFRESH_INTERVAL / 1000}s`);
      lastUpdateEl.classList.remove('refreshing', 'animate', 'error');
      void lastUpdateEl.offsetWidth; // Reflow to reset animation
      lastUpdateEl.classList.add('animate');
    })
    .catch(error => {
      console.error('Error fetching jobs:', error);
      errorMsg.textContent = `Error loading jobs: ${error.message}`;
      errorMsg.style.display = 'block';
      lastUpdateEl.classList.remove('refreshing');
      lastUpdateEl.classList.add('error');
    });
}

// Function to render the table
function renderTable() {
  const tbody = document.getElementById('job-table-body');
  const noJobsMsg = document.getElementById('no-jobs-message');

  if (jobs.length === 0) {
    tbody.innerHTML = '';
    noJobsMsg.style.display = 'block';
    return;
  }

  noJobsMsg.style.display = 'none';
  let tableHtml = '';

  jobs.forEach(job => {
    const jobCns = cns.filter(cn => cn.jobID === job.jobID);
    let totalJobRows = 0;
    jobCns.forEach(cn => {
      const cnDetails = cnd.filter(detail => detail.cnNum === cn.cnNum);
      totalJobRows += Math.max(cnDetails.length, 1);
    });

    if (totalJobRows === 0) {
      // No cns or cnd, render single row with placeholders
      tableHtml += `
        <tr>
          <td>${job.clientName ? job.clientName : '-'}</td>
          <td>${job.jobID || '-'}</td>
          <td>${job.jobDate ? new Date(job.jobDate).toLocaleDateString() : '-'}</td>
          <td>${job.jobDate ? new Date(job.jobDate).toLocaleTimeString() : '-'}</td>
          ${job.cadd3 === null ? `
            <td>${job.cadd1 ? job.cadd1 : ''}</td>
            <td>${job.cadd2 ? job.cadd2 : ''}</td>
          ` : `
            <td>${job.cadd1 ? job.cadd1 : ''}<br>${job.cadd2 ? job.cadd2 : ''}</td>
            <td>${job.cadd3 ? job.cadd3 : ''}</td>
          `}
          <td>${job.jobFin ? new Date(job.jobFin).toLocaleDateString() : '-'}</td>
          ${job.dadd3 === null ? `
            <td>${job.dadd1 ? job.dadd1 : ''}</td>
            <td>${job.dadd2 ? job.dadd2 : ''}</td>
          ` : `
            <td>${job.dadd1 ? job.dadd1 : ''}<br>${job.dadd2 ? job.dadd2 : ''}</td>
            <td>${job.dadd3 ? job.dadd3 : ''}</td>
          `}
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      `;
      return;
    }

    let isFirstJobRow = true;
    let remainingJobRows = totalJobRows;

    jobCns.forEach(cn => {
      const cnDetails = cnd.filter(detail => detail.cnNum === cn.cnNum);
      const cnRowSpan = Math.max(cnDetails.length, 1);
      let isFirstCnRow = true;

      if (cnDetails.length === 0) {
        // No cnd, render one row for cns with placeholders for cnd
        tableHtml += `
          <tr>
            ${isFirstJobRow ? `
              <td rowspan="${totalJobRows}">${job.clientName ? job.clientName : '-'}</td>
              <td rowspan="${totalJobRows}">${job.jobID || '-'}</td>
              <td rowspan="${totalJobRows}">${job.jobDate ? new Date(job.jobDate).toLocaleDateString() : '-'}</td>
              <td rowspan="${totalJobRows}">${job.jobDate ? new Date(job.jobDate).toLocaleTimeString() : '-'}</td>
              ${job.cadd3 === null ? `
                <td rowspan="${totalJobRows}">${job.cadd1 ? job.cadd1 : ''}</td>
                <td rowspan="${totalJobRows}">${job.cadd2 ? job.cadd2 : ''}</td>
              ` : `
                <td rowspan="${totalJobRows}">${job.cadd1 ? job.cadd1 : ''}<br>${job.cadd2 ? job.cadd2 : ''}</td>
                <td rowspan="${totalJobRows}">${job.cadd3 ? job.cadd3 : ''}</td>
              `}
              <td rowspan="${totalJobRows}">${job.jobFin ? new Date(job.jobFin).toLocaleDateString() : '-'}</td>
              ${job.dadd3 === null ? `
                <td rowspan="${totalJobRows}">${job.dadd1 ? job.dadd1 : ''}</td>
                <td rowspan="${totalJobRows}">${job.dadd2 ? job.dadd2 : ''}</td>
              ` : `
                <td rowspan="${totalJobRows}">${job.dadd1 ? job.dadd1 : ''}<br>${job.dadd2 ? job.dadd2 : ''}</td>
                <td rowspan="${totalJobRows}">${job.dadd3 ? job.dadd3 : ''}</td>
              `}
            ` : ''}
            <td rowspan="${cnRowSpan}">${cn.cnNum || '-'}</td>
            <td rowspan="${cnRowSpan}">${cn.noItem || '-'}</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td>-</td>
            <td rowspan="${cnRowSpan}">${cn.jsName || '-'}</td>
            <td rowspan="${cnRowSpan}">${cn.jsType || '-'}</td>
          </tr>
        `;
        isFirstJobRow = false;
        remainingJobRows -= cnRowSpan;
      } else {
        cnDetails.forEach((detail, index) => {
          const isFirstDetailRow = index === 0;
          tableHtml += `
            <tr>
              ${isFirstJobRow ? `
                <td rowspan="${totalJobRows}">${job.clientName ? job.clientName : '-'}</td>
                <td rowspan="${totalJobRows}">${job.jobID || '-'}</td>
                <td rowspan="${totalJobRows}">${job.jobDate ? new Date(job.jobDate).toLocaleDateString() : '-'}</td>
                <td rowspan="${totalJobRows}">${job.jobDate ? new Date(job.jobDate).toLocaleTimeString() : '-'}</td>
                ${job.cadd3 === null ? `
                  <td rowspan="${totalJobRows}">${job.cadd1 ? job.cadd1 : ''}</td>
                  <td rowspan="${totalJobRows}">${job.cadd2 ? job.cadd2 : ''}</td>
                ` : `
                  <td rowspan="${totalJobRows}">${job.cadd1 ? job.cadd1 : ''}<br>${job.cadd2 ? job.cadd2 : ''}</td>
                  <td rowspan="${totalJobRows}">${job.cadd3 ? job.cadd3 : ''}</td>
                `}
                <td rowspan="${totalJobRows}">${job.jobFin ? new Date(job.jobFin).toLocaleDateString() : '-'}</td>
                ${job.dadd3 === null ? `
                  <td rowspan="${totalJobRows}">${job.dadd1 ? job.dadd1 : ''}</td>
                  <td rowspan="${totalJobRows}">${job.dadd2 ? job.dadd2 : ''}</td>
                ` : `
                  <td rowspan="${totalJobRows}">${job.dadd1 ? job.dadd1 : ''}<br>${job.dadd2 ? job.dadd2 : ''}</td>
                  <td rowspan="${totalJobRows}">${job.dadd3 ? job.dadd3 : ''}</td>
                `}
              ` : ''}
              ${isFirstDetailRow ? `
                <td rowspan="${cnRowSpan}">${cn.cnNum || '-'}</td>
              ` : ''}
              <td class="cni">${detail.noItem || '-'}</td>
              <td class="cnd">${detail.psn || '-'}</td>
              <td class="cnw">${detail.itWgt || '-'}</td>
              <td class="cnl">${detail.itLen || '-'}</td>
              <td class="cnb">${detail.itWid || '-'}</td>
              <td class="cnh">${detail.itHei || '-'}</td>
              <td class="cnq">${detail.itQty || '-'}</td>
              <td class="cnd">${detail.unNum || '-'}</td>
              ${isFirstDetailRow ? `
                <td rowspan="${cnRowSpan}">${cn.jsName || '-'}</td>
                <td rowspan="${cnRowSpan}">${cn.jsType || '-'}</td>
              ` : ''}
            </tr>
          `;
          if (isFirstJobRow) isFirstJobRow = false;
        });
      }
    });
  });

  tbody.innerHTML = tableHtml;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
  loadJobs();
  // Auto-refresh every 15 seconds
  setInterval(loadJobs, REFRESH_INTERVAL);
});
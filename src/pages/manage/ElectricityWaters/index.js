import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Dropdown, Button, Modal, Table, Toast, ToastContainer } from 'react-bootstrap';
import print from 'print-js';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import CustomToggle from './CustomToggle';
import { useStore, actions } from '~/store';
import MyTable from '~/components/MyTable';
import MyNavbar from '~/components/MyNavbar';
import MySidebar from '~/components/MySidebar';
import { usePostDownload, useGetElectricityWater, useGetElectricityWaters, useGetYears, useGetFloors, useGetBuildings, usePutBill } from './hooks';
import { SearchSVG, CheckboxSVG, CheckboxSelectedSVG, CheckboxTickSVG, PrintSVG, DetailSVG, ReviewSVG, DownLoadSVG, PDFSVG } from './svgs';

function ElectricityWaters() {
  // console.log('Page: ElectricityWater');

  const [state, dispatch] = useStore();
  const getElectricityWater = useGetElectricityWater();
  const getElectricityWaters = useGetElectricityWaters();
  const getYears = useGetYears();
  const getFloors = useGetFloors();
  const getBuildings = useGetBuildings();
  const putBill = usePutBill();
  const postDownload = usePostDownload();
  const navigate = useNavigate();

  if (!window.localStorage.getItem("role")) navigate('/dang-nhap');

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [id, setId] = useState(null);
  const [printAll, setPrintAll] = useState(null);
  const [download, setDownload] = useState(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [floors, setFloors] = useState(null);
  const [bill, setBill] = useState(null);
  const [bills, setBills] = useState(null);
  const [search, setSearch] = useState({
    buildings: ['H', 'I', 'K', 'L'].map((elem, index) => ({ id: index + 1, title: `Tòa ${elem}`, selected: false })),
    floors,
    years: [...Array(10).keys()].map(x => ({ id: x + 2020, title: `Năm ${x + 2020}`, selected: false })),
    months: [...Array(12).keys()].map(x => ({ id: x + 1, title: `Tháng ${x + 1}`, selected: false })),
    status: [
      { 
        id: 0, 
        title: 'Chưa nộp', 
        selected: false 
      },
      { 
        id: 1, 
        title: 'Đã nộp', 
        selected: false 
      },
    ],
  });

  const updateBills = () => {
    const buildingID = search.buildings.filter(({ selected }) => selected)[0];
    const floorID = search.floors && search.floors.filter(({ selected }) => selected)[0];
    const year = search.years.filter(({ selected }) => selected)[0];
    const month = search.months.filter(({ selected }) => selected)[0];
    const isPaid = search.status.filter(({ selected }) => selected)[0];

    getElectricityWaters.mutate(
      {
        buildingID: buildingID ? buildingID.id : undefined, 
        floorID: floorID ? floorID.id : undefined, 
        year: year ? year.id : undefined,
        month: month ? month.id : undefined,
        isPaid: isPaid ? isPaid.id : undefined,
      },
      {
        onSuccess(data) {
          // console.log(data.data);
          setBills(data.data);
          setLoading(false);
        }
      }
    );
  }

  const hiddenHandel = (type) => {
    if (type === 'detail') {
      setShowDetail(false);
    }
    else {
      setShowReview(false);
    }
    setBill(null);
  }

  const detailHandler = (id, type) => {
    if (type === 'detail') {
      setShowDetail(true);
    }
    else {
      setShowReview(true);
    }

    getElectricityWater.mutate(
      { id },
      {
        onSuccess(data) {
          // console.log(data);
          setBill(data.data);
          setId(id);
        }
      }
    );
  }

  const postDownloadHandle = (id) => {
    postDownload.mutate(
      { 
        body: {
          subscription_ids: [id],
        },
      },
      {
        onSuccess(data) {
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'image.pdf');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    );
  }

  const putBillHandle = (id, isPaid) => {
    setLoading(true);
    putBill.mutate(
      { 
        body: {
          is_paid: isPaid
        },
        id 
      },
      {
        onSuccess(data) {
          console.log(data);
          setToast('Cập nhật thanh toán thành công!');
          updateBills();
        }
      }
    )
  }

  const downloadPDFHandle = (id) => {
    if (bill === null) {
      getElectricityWater.mutate(
        { id },
        {
          onSuccess(data) {
            // console.log(data);
            setBill(data.data);
            setDownload(`${data.data.room_name}_${(new Date(data.data.pay_start_time).getUTCMonth() + 1)}_${(new Date(data.data.pay_start_time).getUTCFullYear() + 1)}`)
          }
        }
      );
    }
  }

  const printAllTest = (id) => {
    setLoading(true);
    postDownload.mutate(
      { 
        body: {
          subscription_ids: id ? [id] : bills.map(({ subscription_id }) => subscription_id),
        },
      },
      {
        onSuccess(data) {
          const url = window.URL.createObjectURL(new Blob([data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'image.pdf');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setLoading(false);
        }
      }
    );
  }

  useEffect(() => {
    if (printAll) {
      print({
        printable: 'review-all', 
        type: 'html',
        targetStyles: ['*'],
      });
      setPrintAll(false);
    }
  }, [printAll]);

  useEffect(() => {
    if (download !== null) {
      html2canvas(document.querySelector("#review")).then(canvas => {
        const pdf = new jsPDF();
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0);
        pdf.save(`${download}.pdf`); 
        setDownload(null);
        setBill(null);
      });
    }
  }, [download]);

  useEffect(() => {
    setLoading(true);
    updateBills();

    const buildingID = search && search.buildings.filter(({ selected }) => selected)[0];
    if (buildingID) {
      if (!search.floors) {
        setSearch(() => ({
          ...search, 
          floors: floors.filter(({ building_id }) => building_id === buildingID.id)
            .map(({ id, name, building_id }) => ({
               id: id, 
               buildingId: building_id,
               title: `Tầng ${name}`, 
               selected: false 
            }))
        }));
      }
      else if (search.floors[0].buildingId !== buildingID.id) {
        setSearch(() => ({
          ...search, 
          floors: floors.filter(({ building_id }) => building_id === buildingID.id)
            .map(({ id, name, building_id }) => ({
               id: id, 
               buildingId: building_id,
               title: `Tầng ${name}`, 
               selected: false 
            }))
        }));
      }
    }
  }, [search]);

  useEffect(() => {
    getBuildings.mutate(
      {},
      {
        onSuccess(data) {
          console.log('getBuildings:', data);
          setSearch(() => ({
            ...search, 
            buildings: data.data.map(({ id, name }) => ({ 
              id: id, 
              title: `Tòa ${name}`, 
              selected: false 
            }))
          }));
        }
      }
    );

    getFloors.mutate(
      {},
      {
        onSuccess(data) {
          console.log('getFloors:', data);
          setFloors(data.data);
        }
      }
    );

    getYears.mutate(
      {},
      {
        onSuccess(data) {
          console.log('getYears:', data);
          setSearch(() => ({
            ...search,
            years: [...Array((data.data.year_current - data.data.year_start) + 1).keys()]
              .map(x => ({ 
                id: x + data.data.year_start, 
                title: `Năm ${x + data.data.year_start}`, 
                selected: false 
              })),
          }));
        }
      }
    );
  }, []);
  
  console.log(bills);
  // console.log(search);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', userSelect: 'none'}}>
        <div>
          <svg style={{ width: '24px', height: '24px', margin: '0px 16px', cursor: 'pointer' }} onClick={() => dispatch(actions.setIsOpenSidebar(!state.isOpenSidebar))} viewBox="0 0 30 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M30 20H0V16.6667H30V20ZM30 11.6667H0V8.33333H30V11.6667ZM30 3.33333H0V0H30V3.33333Z" fill="#06245E"/>
          </svg>  
        </div>
        <div style={{ width: '100%' }}>
          <MyNavbar isSite={false}></MyNavbar>
        </div>
      </div>
    
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <MySidebar isOpen={state.isOpenSidebar}></MySidebar>

        <div
          style={{
            width: '100%',
            padding: '40px',
          }}
        >
          <div
            style={{
              display: 'flex', 
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Button style={{ width: '180px', }} onClick={() => printAllTest()} variant="primary">
                <PrintSVG style={{ width: '18px', height: '20px' }} /> In tất cả hóa đơn
              </Button>
            </div>

            <div
              style={{
                display: 'flex',
                gap: '8px',
              }}
            >
              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  {search.buildings.filter(({ selected }) => selected)[0] 
                    ? search.buildings.filter(({ selected }) => selected)[0].title 
                    : 'Tòa'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                    {search.buildings.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setSearch({
                          ...search, 
                          buildings: search.buildings.map(building => ({...building, selected: building.title === title}))}
                        )}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  {!search.floors 
                    ? 'Tầng'
                    : search.floors.filter(({ selected }) => selected)[0] 
                    ? search.floors.filter(({ selected }) => selected)[0].title 
                    : 'Tầng'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div 
                    style={{ 
                      width: '280px', 
                      padding: '0px 20px', 
                      margin: '0px auto',
                      display: 'grid', 
                      gridTemplateColumns: '50% 50%'
                    }}
                  >
                    {search.floors === null ? <>Hãy chọn Tòa trước</> : search.floors.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setSearch({
                          ...search, 
                          floors: search.floors.map(floor => ({...floor, selected: floor.title === title}))}
                        )}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  {search.years.filter(({ selected }) => selected)[0] 
                    ? search.years.filter(({ selected }) => selected)[0].title 
                    : 'Năm'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                    {search.years.map(({ title, selected }) => (
                      <div 
                        style={{ 
                          margin: '4px 0px', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '8px', 
                          cursor: 'pointer' 
                        }} 
                        onClick={() => setSearch({
                          ...search, 
                          years: search.years.map(year => ({...year, selected: year.title === title}))}
                        )}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  {search.months.filter(({ selected }) => selected)[0] 
                    ? search.months.filter(({ selected }) => selected)[0].title 
                    : 'Tháng'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                    {search.months.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setSearch({
                          ...search, 
                          months: search.months.map(month => ({...month, selected: month.title === title}))}
                        )}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <Dropdown>
                <Dropdown.Toggle as={CustomToggle}>
                  {search.status.filter(({ selected }) => selected)[0] 
                    ? search.status.filter(({ selected }) => selected)[0].title 
                    : 'Trạng thái'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <div style={{ padding: '0px 20px', margin: '0px auto' }}>
                    {search.status.map(({ title, selected }) => (
                      <div 
                        style={{ margin: '4px 0px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} 
                        onClick={() => setSearch({
                          ...search, 
                          status: search.status.map(elem => ({...elem, selected: elem.title === title}))}
                        )}
                      >
                        {selected 
                          ? <CheckboxSelectedSVG style={{ width: '16px', height: '16px'}} />
                          : <CheckboxSVG style={{ width: '16px', height: '16px'}} />}
                        {title}
                      </div>
                    ))}
                  </div>
                </Dropdown.Menu>
              </Dropdown>

              <div
                style={{
                  padding: '8px',
                  border: 'solid #D9D9D9 1px',
                  fontWeight: 'bold',
                  color: '#FF0000',
                  cursor: 'pointer',
                  userSelect: 'none',
                }}
                onClick={() => window.location.reload()}
              >RESET</div>
            </div>
          </div>

          {!bills ? <></> : (
            <MyTable forms={bills.map(({ subscription_id, room_name, electricity_count, water_count, price, pay_end_time, is_paid }) => ({
              room_name: {
                title: 'Tên phòng',
                content: room_name,
              },
              electricity_count: {
                title: 'Số điện',
                content: electricity_count,
              },
              water_count: {
                title: 'Số nước',
                content: water_count,
              },
              price: {
                title: 'Tổng tiền',
                content: price,
              },
              pay_end_time: {
                title: 'Hạn chót thanh toán',
                center: true,
                content: <div style={{ textAlign: 'center' }}>{pay_end_time}</div>
              },
              set_paid: {
                title: 'Đánh dấu thanh toán',
                center: true,
                content: <div style={{ width: '160px', margin: '0px auto' }} onClick={() => putBillHandle(subscription_id, !is_paid)}>
                  {is_paid
                    ? (
                      <>
                        <CheckboxTickSVG style={{ width: '16px', height: '16px' }} /> Đã Thanh toán
                      </>
                    )
                    : (
                      <>
                        <CheckboxSVG style={{ width: '16px', height: '16px' }} /> Chưa thanh toán
                      </>
                    )}
                </div>,
              },
              controls: {
                title: '',
                content: (
                  <>
                    <span 
                      style={{ margin: '0px 4px', cursor: 'pointer', }} 
                      onClick={() => detailHandler(subscription_id, 'detail')}
                    >
                      <DetailSVG style={{ width: '20px', height: '20px' }} />
                    </span>
                    <span 
                      style={{ margin: '0px 4px', cursor: 'pointer', }} 
                      onClick={() => detailHandler(subscription_id, 'review')}
                    >
                      <ReviewSVG style={{ width: '20px', height: '20px' }} />
                    </span>
                    <span 
                      style={{ margin: '0px 4px', cursor: 'pointer', }}
                      onClick={() => printAllTest(subscription_id)}
                    >
                      <DownLoadSVG style={{ width: '20px', height: '20px' }} />
                    </span>
                  </>
                ),
              }
            }))}></MyTable>
          )}
        </div>
      </div>
      
      <Modal size="lg" show={showDetail} onHide={() => hiddenHandel('detail')}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div style={{ padding: '20px 80px' }}>
            {bill === null ? <>Loading...</> : (
              <div style={{ textAlign: 'center' }}>
                <div 
                  style={{ 
                    fontWeight: 'bold',
                    color: '#0B42AB',
                  }}
                >CHI TIẾT SỬ DỤNG ĐIỆN NƯỚC - Tháng {(new Date(bill.pay_start_time).getUTCMonth() + 1)}/{(new Date(bill.pay_start_time).getUTCFullYear() + 1)}</div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>Phòng:</span> {bill.room_name}
                </div>
                <Table>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Số điện</td>
                      <td>{bill.money.electricity_count}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Số nước</td>
                      <td>{bill.money.water_count}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Giá tiền 1kwh điện</td>
                      <td>{bill.money.money_per_kwh}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Giá tiền một lít nước</td>
                      <td>{bill.money.money_per_m3}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Tổng tiền nước</td>
                      <td>{bill.money.water_money}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Tổng tiền điện</td>
                      <td>{bill.money.electricity_money}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Tổng tiền thanh toán</td>
                      <td>{bill.money.total_money}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>Hạn chót thanh toán</td>
                      <td>{bill.pay_end_time}</td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: 'bold' }}>ngày xuất hóa đơn</td>
                      <td>{bill.pay_start_time}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
      
      <Modal size="lg" show={showReview} onHide={() => hiddenHandel('review')}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {bill === null ? <>Loading...</> : (
            <div style={{ padding: '20px 80px', textAlign: 'center' }}>
              <div style={{ width: '100%', margin: 'center' }}>
                <div style={{ fontWeight: 'bold' }}>TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG</div>
                <div style={{ fontWeight: 'bold' }}>KÝ TÚC XÁ</div>
                <div style={{ width: '100%', height: '20px' }}></div>

                <div style={{ fontWeight: 'bold' }}>THÔNG BÁO</div>
                <div style={{ fontWeight: 'bold' }}>Thu tiền phí sử dụng điện, nước ở ký túc xá - Tháng {(new Date(bill.pay_start_time).getUTCMonth() + 1)}/{(new Date(bill.pay_start_time).getUTCFullYear() + 1)}</div>
                <div style={{ width: '100%', height: '20px' }}></div>

                <div>
                  <span style={{ fontWeight: 'bold' }}>Phòng:</span> {bill.room_name}
                </div>
                <div style={{ width: '100%', height: '20px' }}></div>

                <div
                  style={{ 
                    width: '400px',
                    padding: '8px',
                    margin: '0px auto',
                    border: 'solid #000000 1px', 
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <div style={{ width: '70%', fontWeight: 'bold', }}>Tổng cộng</div>
                    <div style={{ width: '30%' }}>{bill.money.total_money}</div>
                  </div>

                  <div style={{ height: '.8px', margin: '12px 0px', backgroundColor: '#000000' }}></div>

                  <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <div style={{ display: 'grid', gridTemplateAreas: '"a b" "c d"', gap: '8px 16px', textAlign: 'left' }}>
                      <div>Hạn chót thanh toán</div>
                      <div>{bill.pay_end_time}</div>
                      <div>Ngày xuất hoá đơn</div>
                      <div>{bill.pay_start_time}</div>
                    </div>
                  </div>
                </div>
                <div style={{ width: '100%', height: '20px' }}></div>
              </div>

              <div>
                <button
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: '#0B42AB',
                    color: '#FFFFFF',
                  }}
                  onClick={() => postDownloadHandle(id)}
                >
                  <PDFSVG style={{ width: '20px', height: '25px' }} /> <span style={{ marginLeft: '8px' }}>In hóa đơn</span>
                </button>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>

      {bill && (
        <div style={{ width: '0px', height: '0px', overflow: 'hidden' }}>
          <div style={{ width: '724px', padding: '40px', textAlign: 'center' }} id="review">
            <div style={{ fontWeight: 'bold' }}>TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG</div>
            <div style={{ fontWeight: 'bold' }}>KÝ TÚC XÁ</div>
            <div style={{ width: '100%', height: '20px' }}></div>

            <div style={{ fontWeight: 'bold' }}>THÔNG BÁO</div>
            <div style={{ fontWeight: 'bold' }}>Thu tiền phí sử dụng điện, nước ở ký túc xá - Tháng {(new Date(bill.pay_start_time).getUTCMonth() + 1)}/{(new Date(bill.pay_start_time).getUTCFullYear() + 1)}</div>
            <div style={{ width: '100%', height: '20px' }}></div>

            <div>
              <span style={{ fontWeight: 'bold' }}>Phòng:</span> {bill.room_name}
            </div>
            <div style={{ width: '100%', height: '20px' }}></div>

            <div
              style={{ 
                width: '400px',
                padding: '8px',
                margin: '0px auto',
                border: 'solid #000000 1px', 
              }}
            >
              <div
                style={{
                  display: 'flex',
                }}
              >
                <div style={{ width: '70%', fontWeight: 'bold', }}>Tổng cộng</div>
                <div style={{ width: '30%' }}>{bill.money.total_money}</div>
              </div>

              <div style={{ height: '.8px', margin: '12px 0px', backgroundColor: '#000000' }}></div>

              <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                <div style={{ display: 'grid', gridTemplateAreas: '"a b" "c d"', gap: '8px 16px', textAlign: 'left' }}>
                  <div>Hạn chót thanh toán</div>
                  <div>{bill.pay_end_time}</div>
                  <div>Ngày xuất hoá đơn</div>
                  <div>{bill.pay_start_time}</div>
                </div>
              </div>
            </div>
            <div style={{ width: '100%', height: '20px' }}></div>
          </div>
        </div> 
      )}

      {printAll && (
        <div style={{ width: '0px', height: '0px', overflow: 'hidden' }}>
          <div id="review-all">
            {bills === null ? <></> : bills.map(({ room_name, price, pay_end_time }, index) => (
              <div style={{ width: '724px', height: '480px',padding: '40px', textAlign: 'center' }}>
                <div style={{ fontWeight: 'bold' }}>TRƯỜNG ĐẠI HỌC TÔN ĐỨC THẮNG</div>
                <div style={{ fontWeight: 'bold' }}>KÝ TÚC XÁ</div>
                <div style={{ width: '100%', height: '20px' }}></div>

                <div style={{ fontWeight: 'bold' }}>THÔNG BÁO</div>
                <div style={{ fontWeight: 'bold' }}>Thu tiền phí sử dụng điện, nước ở ký túc xá - Tháng {(new Date(pay_end_time).getUTCMonth() + 1)}/{(new Date(pay_end_time).getUTCFullYear() + 1)}</div>
                <div style={{ width: '100%', height: '20px' }}></div>

                <div>
                  <span style={{ fontWeight: 'bold' }}>Phòng:</span> {room_name}
                </div>
                <div style={{ width: '100%', height: '20px' }}></div>

                <div
                  style={{ 
                    width: '400px',
                    padding: '8px',
                    margin: '0px auto',
                    border: 'solid #000000 1px', 
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                    }}
                  >
                    <div style={{ width: '70%', fontWeight: 'bold', }}>Tổng cộng</div>
                    <div style={{ width: '30%' }}>{price}</div>
                  </div>

                  <div style={{ height: '.8px', margin: '12px 0px', backgroundColor: '#000000' }}></div>

                  <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <div style={{ display: 'grid', gridTemplateAreas: '"a b" "c d"', gap: '8px 16px', textAlign: 'left' }}>
                      <div>Hạn chót thanh toán</div>
                      <div>{pay_end_time}</div>
                      <div>Ngày xuất hoá đơn</div>
                      <div>{pay_end_time}</div>
                    </div>
                  </div>
                </div>
                <div style={{ width: '100%', height: '20px' }}></div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <ToastContainer position="bottom-end">
        <Toast bg="dark" onClose={() => setToast(null)} show={toast !== null} delay={3000} autohide>
          <Toast.Header>
            <div style={{ width: '100%' }}></div>
          </Toast.Header>
          <Toast.Body style={{ color: '#FFFFFF' }}>{toast}</Toast.Body>
        </Toast>
      </ToastContainer>

      <div
        style={{
          width: '100vw',
          height: '100vh',
          backgroundColor: '#00000040',
          position: 'fixed',
          top: '0px',
          left: '0px',
          zIndex: '9999999999999999999999'
        }}
        hidden={!loading}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <svg style={{ width: '100px', height: '100px', animation: 'rotation 1s linear infinite' }} viewBox="0 0 512.000000 512.000000">
            <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
              <path d="M2496 4690 c-136 -41 -197 -208 -119 -327 48 -75 112 -103 233 -103
              92 0 253 -23 359 -50 490 -125 896 -454 1117 -905 320 -655 190 -1429 -326
              -1945 -525 -526 -1325 -650 -1979 -309 -854 446 -1172 1495 -706 2334 83 149
              91 219 33 313 -42 69 -155 107 -245 81 -76 -21 -119 -73 -210 -255 -303 -607
              -308 -1298 -14 -1899 215 -439 550 -774 986 -985 159 -78 264 -117 415 -154
              488 -119 992 -69 1435 143 447 214 789 553 1006 996 393 804 244 1756 -378
              2416 -283 299 -704 531 -1116 613 -194 39 -424 56 -491 36z"/>
            </g>
          </svg>
        </div>
      </div>
    </>
  );
}

export default ElectricityWaters;
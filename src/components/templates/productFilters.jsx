import React, {useState, useEffect} from "react";
import Offcanvas from 'react-bootstrap/Offcanvas';
import {handleFilterState, multiListFiltersData, singleListFiltersData } from '../../utils/utils.js';
import {CloseIcon, CloseSm} from "../svgIcons.jsx"
const ProductsFilters = ({ 
    multiDataArray=false, 
    dataArrayOne=[], dataArrayTwo=[], setFilteredDataOne=[],setFilteredDataTwo=[],filteredDataOne=[], filteredDataTwo=[], applyFilters    
}) => {   
    const [productCount, setProductCount] = useState('');     
    const [currentId, setCurrentId] =useState(null);   
    const [isClear, setIsClear]=useState(false);   
    const [filtersPopup, setfiltersPopup] =useState(false);
    const [filterstabs, setFiltertabs] =useState(false);        
    const orders=[
        {
            title:'latest',
            val:'latest',
            status:1 
        },
        {
            title:'price low-high',
            val:'price-low-high',
            status:0
        },
        {
            title:'price high-low',
            val:'price-high-low',
            status:0 
        }
    ];
    // const types=['Men', 'Women'];
    const types=[
        {
            title:'Men',
            val:'men',
            status:1

        },
        {
            title:'Women',
            val:'women',
            status:1

        }        
    ];
    const complications=[        
        {
            title:'Date',
            val:'Date',
            status:1

        },
        {
            title:'GMT',
            val:'GMT',
            status:1

        },
        {
            title:'Diver',
            val:'Diver',
            status:1

        }       
    ];
    const diameters=[
        {
            title:'40-41',
            val:'small',
            status:1

        },
        {
            title:'34-36',
            val:'medium',
            status:0
        },
        {
            title:'42-43',
            val:'large',
            status:0
        }
        
    ];
    const illimunations=[
        {
            title:'trigalight',
            val:'trigalight'
        },
        {
            title:'Super LimiNova',
            val:'superLimiNova'
        }
    ];    
    const dialColors=[
        {
            title:'Black',
            val:'Black',
            status:1

        },
        {
            title:'Green',
            val:'Green',
            status:1

        },
        {
            title:'Blue',
            val:'Blue',
            status:1

        },
        {
            title:'White',
            val:'White',
            status:0

        }
    ];
    const caseColors=['Silver','Black','Gunmetal'];
    const straps=[
        {
            title:'Rubber',
            val:'Rubber',
            status:1

        },
        {
            title:'Steel',
            val:'Steel',
            status:1

        },
        {
            title:'Leather',
            val:'Leather',
            status:0

        },
        {
            title:'Sailcloth',
            val:'Sailcloth',
            status:0

        }       
    ];
    const [orderBy, setOrderBy] = useState('latest'); 
    const [typeFilters, setTypeFilters] = useState([]); 
    const [compFilters, setCompFilters] = useState([]);
    const [diaFilters, setDiaFilters] = useState([]);   
    const [lmsnFilters, setLmsnFilters] = useState([]);   
    const [dialFilters, setDialFilters] = useState([]);   
    const [caseFilters, setCaseFilters] = useState([]);   
    const [strapFilters, setStrapFilters] = useState([]);     
    const handleOrder=(orderBy)=>{
        setOrderBy(orderBy);   
    };
    useEffect(()=>{
        if(typeFilters.length>0 || lmsnFilters.length>0 || compFilters.length>0 || diaFilters.length>0 || dialFilters.length>0 || caseFilters.length>0 || strapFilters.length>0){
            setIsClear(true);
            applyFilters(true);
        }else{
            setIsClear(false);
            applyFilters(false);
        }        
    },[typeFilters, lmsnFilters, compFilters, diaFilters, dialFilters, caseFilters, strapFilters]);
    useEffect(()=>{
      if(multiDataArray===true && dataArrayOne.length>0 && dataArrayTwo.length>0){
        let filtersResults=multiListFiltersData(
            dataArrayOne,
            dataArrayTwo,
            typeFilters,
            lmsnFilters,
            compFilters, 
            diaFilters, 
            dialFilters, 
            caseFilters, 
            strapFilters,
            orderBy 
        );           
        setFilteredDataOne(filtersResults.utList);
        setFilteredDataTwo(filtersResults.e1List);
        setProductCount(filtersResults.count);        
      }else{
        let filtersResults=singleListFiltersData(
            dataArrayOne,            
            typeFilters,
            lmsnFilters,
            compFilters, 
            diaFilters, 
            dialFilters, 
            caseFilters, 
            strapFilters,
            orderBy
        );
        setFilteredDataOne(filtersResults.productsList);       
        setProductCount(filtersResults.count);  
      }  
    },[multiDataArray, typeFilters, lmsnFilters, compFilters, diaFilters, dialFilters, caseFilters, strapFilters, orderBy]);    
    const handleFilterTabs=(fData, setFData, fVal)=>{
        handleFilterState(fData, setFData, fVal);
        setTimeout(() => {	
            setFiltertabs(false);            
        }, 800);
    }
    const showFiltersPopup=(id)=>{
        setCurrentId(id);
        setfiltersPopup(true);        
    }
    const closeFiltersPopup=()=>{       
        setfiltersPopup(false);
    } 
    const clearFilters=()=>{
        setTypeFilters([]);
        setCompFilters([]);
        setDiaFilters([]);
        setLmsnFilters([]);
        setDialFilters([]);
        setCaseFilters([]);
        setStrapFilters([]);
        setIsClear(false);        
        if(filtersPopup===true){
            setfiltersPopup(false);
        }             
    }            
	return(
		<>
            <div className="filters desktop d-none d-sm-block">
                <div className="position-relative">
                    <div className="site-container">
                        <div className="row pt-2 pb-2">
                            <div className="col-sm-12 col-xl-9 order-1 d-none d-xl-block">
                                <ul className="nav nav-pills mb-0" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <button className="nav-link transparent text-white" data-bs-toggle="pill" tabIndex="-1" onClick={()=>setFiltertabs(false)}>Filters</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="watch-type-tab" data-bs-toggle="pill" data-bs-target="#watch-type" type="button" role="tab" aria-controls="watch-type" aria-selected="false" onClick={()=>setFiltertabs(true)}>Type {typeFilters.length>0?<span className="filter-count sm ms-1">{typeFilters.length}</span>:''}</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="watch-complication-tab" data-bs-toggle="pill" data-bs-target="#watch-complication" type="button" role="tab" aria-controls="watch-complication" aria-selected="false" onClick={()=>setFiltertabs(true)}>Complication {compFilters.length>0?<span className="filter-count sm ms-1">{compFilters.length}</span>:''}</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="watch-diameter-tab" data-bs-toggle="pill" data-bs-target="#watch-diameter" type="button" role="tab" aria-controls="watch-diameter" aria-selected="false" onClick={()=>setFiltertabs(true)}>Diameter {diaFilters.length>0?<span className="filter-count sm ms-1">{diaFilters.length}</span>:''}</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="watch-illumination-tab" data-bs-toggle="pill" data-bs-target="#watch-illumination" type="button" role="tab" aria-controls="watch-illumination" aria-selected="false" onClick={()=>setFiltertabs(true)}>Illumination {lmsnFilters.length>0?<span className="filter-count sm ms-1">{lmsnFilters.length}</span>:''}</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="watch-dial-Color-tab" data-bs-toggle="pill" data-bs-target="#watch-dial-Color" type="button" role="tab" aria-controls="watch-dial-Color" aria-selected="false" onClick={()=>setFiltertabs(true)}>Dial Color {dialFilters.length>0?<span className="filter-count sm ms-1">{dialFilters.length}</span>:''}</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="watch-case-color-tab" data-bs-toggle="pill" data-bs-target="#watch-case-color" type="button" role="tab" aria-controls="watch-case-color" aria-selected="false" onClick={()=>setFiltertabs(true)}>Case Color {caseFilters.length>0?<span className="filter-count sm ms-1">{caseFilters.length}</span>:''}</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="watch-strap-tab" data-bs-toggle="pill" data-bs-target="#watch-strap" type="button" role="tab" aria-controls="watch-strap" aria-selected="false" onClick={()=>setFiltertabs(true)}>Strap {strapFilters.length>0?<span className="filter-count sm ms-1">{strapFilters.length}</span>:''}</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link disabled" id="watch-price-tab" data-bs-toggle="pill" data-bs-target="#watch-price" type="button" role="tab" aria-controls="watch-price" aria-selected="false">Price</button>
                                    </li>
                                    {isClear===true?(
                                        <li className="nav-item">
                                            <button className="nav-link transparent text-white" onClick={()=>clearFilters()}>
                                                <span className="d-inline-flex align-items-center">
                                                    <CloseSm color="#fff" /><span className="ms-2">Clear</span>
                                                </span>
                                            </button>
                                        </li>
                                    ):''}                                                    
                                </ul>
                            </div>
                            <div className="col-sm-12 col-xl-3 order-2 text-end d-none d-sm-block">
                                <ul className="filter-menu transparent align-items-center h-100">
                                    <li className="d-inline-block me-3">
                                        <span className="text-white fs-6 fw-md">{productCount?(productCount+' Watches'):'' } </span>
                                    </li> 
                                    <li className="dropdown ">
                                        <span className="d-inline-flex align-items-center space-between w-100 text-white"><span className="text">Sort by : </span><span className="text">{orderBy}</span><img className={`align-middle icon-img small`} src="/svg/angle-down.svg" alt="angle-down" width="12" /></span>                  
                                        <ul className="dropdown_menu dropdown_menu--animated dropdown_menu-6 transparent">
                                            {orders.map((order,index)=>{ 
                                                const {title, val, status}  =order; 
                                                return(
                                                    <li key={"sort-by"+index} className={orderBy===val?'dropdown_item-1 active':status===1?'dropdown_item-1':'dropdown_item-1 d-none'} onClick={()=>handleOrder(val)}>{title}</li>
                                                );
                                            })}                                            
                                        </ul>
                                    </li>
                                </ul>
                            </div>                            
                        </div>
                    </div>                                                         
                    <div className={filterstabs===true? "site-container tab-content filter-tab-content show":"site-container tab-content filter-tab-content d-none d-xl-block"} id="pills-tabContent">                                                
                        <div className="tab-pane fade w-100" id="watch-type" role="tabpanel" aria-labelledby="watch-type-tab">                            
                            <div className={filterstabs===true?"filter-data d-flex":"filter-data d-none"}>
                                {filterstabs===true?(
                                    <div aria-label="close-types" className="close-filter">
                                        <span onClick={()=>setFiltertabs(false)} className="link">&times;</span></div>
                                ):''}                              
                                <div className="filter-title">
                                    <h3 className="d-flex align-items-center sec-title-sm text-uppercase mb-0">Type {typeFilters.length>0?<span className="filter-count lg ms-2">{typeFilters.length}</span>:''}</h3>
                                </div>                                                                
                                <div className="filter-options">
                                    {types.map((type,index)=>{ 
                                        const {title, val}=type;                                      
                                        return(
                                            <div key={'type-'+index} className="field-wrap form-check check-btn">
                                                <input className="form-check-input" type="checkbox" name={'type'+val} id={'type'+title}                                                   
                                                    value={val}
                                                    checked={typeFilters.includes(val)}
                                                    onChange={() => handleFilterTabs(typeFilters, setTypeFilters, val)}                                     
                                                />
                                                <label className="form-check-label other" htmlFor={'type'+title}> {title} </label>                                   
                                            </div>
                                        );
                                    })}                                    
                                </div>                                
                            </div>                                                        
                        </div>
                        <div className="tab-pane fade" id="watch-complication" role="tabpanel" aria-labelledby="watch-complication-tab">                        
                            <div className={filterstabs===true?"filter-data d-flex":"filter-data d-none"}>
                                {filterstabs===true?(
                                    <div aria-label="close-types" className="close-filter"><span onClick={()=>setFiltertabs(false)} className="link">&times;</span></div>
                                ):''} 
                                <div className="filter-title">
                                    <h3 className="d-flex align-items-center sec-title-sm text-uppercase mb-0">Complication {compFilters.length>0?<span className="filter-count lg ms-2">{compFilters.length}</span>:''}</h3>
                                </div>                                                                
                                <div className="filter-options">
                                    {complications.map((comp,index)=>{ 
                                        const{title, status} = comp;                                      
                                        return(
                                            <div key={'comp-'+index} className={status===1?"field-wrap form-check check-btn":"field-wrap form-check check-btn disabled"}>
                                                <input className="form-check-input" type="checkbox" name={title} id={title}                                                   
                                                    value={title}
                                                    checked={compFilters.includes(title)}
                                                    onChange={() => handleFilterTabs(compFilters, setCompFilters, title)}                                     
                                                />
                                                <label className="form-check-label other" htmlFor={title}> {title} </label>                                   
                                            </div>
                                        );
                                    })}                                    
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="watch-diameter" role="tabpanel" aria-labelledby="watch-diameter-tab">                        
                            <div className={filterstabs===true?"filter-data d-flex":"filter-data d-none"}>
                                {filterstabs===true?(
                                    <div aria-label="close-types" className="close-filter"><span onClick={()=>setFiltertabs(false)} className="link">&times;</span></div>
                                ):''}
                                <div className="filter-title">
                                    <h3 className="d-flex align-items-center sec-title-sm text-uppercase mb-0">diameters {diaFilters.length>0?<span className="filter-count lg ms-2">{diaFilters.length}</span>:''}</h3>
                                </div>                                                                
                                <div className="filter-options">
                                    {diameters.map((diameter,index)=>{  
                                        const{title, val, status} =diameter;                                 
                                        return(
                                            <div key={'diameter-'+index} className={status===1?"field-wrap form-check check-btn":"field-wrap form-check check-btn disabled"}>
                                                <input className="form-check-input" type="checkbox" name={val} id={val}                                                   
                                                    value={title}
                                                    checked={diaFilters.includes(title)}
                                                    onChange={() => handleFilterTabs(diaFilters, setDiaFilters, title)}                                     
                                                />
                                                <label className="form-check-label other" htmlFor={val}> {title} </label>                                   
                                            </div>
                                        );
                                    })}                                    
                                </div>
                            </div>
                        </div>               
                        <div className="tab-pane fade" id="watch-illumination" role="tabpanel" aria-labelledby="watch-illumination-tab">
                            <div className={filterstabs===true?"filter-data d-flex":"filter-data d-none"}>
                                {filterstabs===true?(
                                    <div aria-label="close-types" className="close-filter"><span onClick={()=>setFiltertabs(false)} className="link">&times;</span></div>
                                ):''}
                                <div className="filter-title">
                                    <h3 className="d-flex align-items-center sec-title-sm text-uppercase mb-0">Illumination {lmsnFilters.length>0?<span className="filter-count lg ms-2">{lmsnFilters.length}</span>:''}</h3>
                                </div>                                                                
                                <div className="filter-options">
                                    {illimunations.map((illimunation,index)=>{ 
                                        const {title, val}= illimunation ;                               
                                        return(
                                            <div key={'illimunation-'+index} className="field-wrap form-check check-btn">
                                                <input className="form-check-input" type="checkbox" name={val} id={val}                                                   
                                                    value={title}
                                                    checked={lmsnFilters.includes(title)}
                                                    onChange={() => handleFilterTabs(lmsnFilters, setLmsnFilters, title)}                                     
                                                />
                                                <label className="form-check-label other" htmlFor={val}> {title} </label>                                   
                                            </div>
                                        );
                                    })}                                    
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="watch-dial-Color" role="tabpanel" aria-labelledby="watch-dial-Color-tab">
                            <div className={filterstabs===true?"filter-data d-flex":"filter-data d-none"}>
                                {filterstabs===true?(
                                    <div aria-label="close-types" className="close-filter"><span onClick={()=>setFiltertabs(false)} className="link">&times;</span></div>
                                ):''}
                                <div className="filter-title">
                                    <h3 className="d-flex align-items-center sec-title-sm text-uppercase mb-0">Dial Color {dialFilters.length>0?<span className="filter-count lg ms-2">{dialFilters.length}</span>:''}</h3>
                                </div>                                                                
                                <div className="filter-options">
                                    {dialColors.map((dialColor,index)=>{
                                        const{title, status} =dialColor;                                           
                                        return(
                                            <div key={'dial-color-'+index} className={status===1?"field-wrap form-check check-btn":"field-wrap form-check check-btn disabled"}>
                                                <input className="form-check-input" type="checkbox" name={'dial-'+title} id={'dial-'+title}                                                   
                                                    value={title}
                                                    checked={dialFilters.includes(title)}
                                                    onChange={() => handleFilterTabs(dialFilters, setDialFilters, title)}                                     
                                                />                                                
                                                <label className="form-check-label other" htmlFor={'dial-'+title}> {title} </label>                                   
                                            </div>
                                        );
                                    })}                                    
                                </div>
                            </div> 
                        </div>
                        <div className="tab-pane fade" id="watch-case-color" role="tabpanel" aria-labelledby="watch-case-color-tab">
                            <div className={filterstabs===true?"filter-data d-flex":"filter-data d-none"}>
                                {filterstabs===true?(
                                    <div aria-label="close-types" className="close-filter"><span onClick={()=>setFiltertabs(false)} className="link">&times;</span></div>
                                ):''}
                                <div className="filter-title">
                                    <h3 className="d-flex align-items-center sec-title-sm text-uppercase mb-0">Case Color {caseFilters.length>0?<span className="filter-count lg ms-2">{caseFilters.length}</span>:''}</h3>
                                </div>                                                                
                                <div className="filter-options">
                                    {caseColors.map((caseColor,index)=>{                                       
                                        return(
                                            <div key={'case-color-'+index} className="field-wrap form-check check-btn">
                                                <input className="form-check-input" type="checkbox" name={'case-'+caseColor} id={'case-'+caseColor}                                                   
                                                    value={caseColor}
                                                    checked={caseFilters.includes(caseColor)}
                                                    onChange={() => handleFilterTabs(caseFilters, setCaseFilters, caseColor)}                                     
                                                />
                                                <label className="form-check-label other" htmlFor={'case-'+caseColor}> {caseColor} </label>                                   
                                            </div>
                                        );
                                    })}                                    
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="watch-strap" role="tabpanel" aria-labelledby="watch-strap-tab">
                            <div className={filterstabs===true?"filter-data d-flex":"filter-data d-none"}>
                                {filterstabs===true?(
                                    <div aria-label="close-types" className="close-filter"><span onClick={()=>setFiltertabs(false)} className="link">&times;</span></div>
                                ):''}
                                <div className="filter-title">
                                    <h3 className="d-flex align-items-center sec-title-sm text-uppercase mb-0">Strap {strapFilters.length>0?<span className="filter-count lg ms-2">{strapFilters.length}</span>:''}</h3>
                                </div>                                                                
                                <div className="filter-options">
                                    {straps.map((strap,index)=>{
                                        const{title, status} =strap;                                         
                                        return(
                                            <div key={'dial-color-'+index} className={status===1?"field-wrap form-check check-btn":"field-wrap form-check check-btn disabled"}>
                                                <input className="form-check-input" type="checkbox" name={title} id={title}                                                   
                                                    value={title}
                                                    checked={strapFilters.includes(title)}
                                                    onChange={() => handleFilterTabs(strapFilters, setStrapFilters, title)}                                     
                                                />
                                                <label className="form-check-label other" htmlFor={title}> {title} </label>                                   
                                            </div>
                                        );
                                    })}                                    
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="watch-price" role="tabpanel" aria-labelledby="watch-price-tab">
                            <div className={filterstabs===true?"filter-data d-flex":"filter-data d-none"}>
                                {filterstabs===true?(
                                    <div aria-label="close-types" className="close-filter"><span onClick={()=>setFiltertabs(false)} className="link">&times;</span></div>
                                ):''}
                                <div className="filter-title">
                                    <h3 className="d-flex align-items-center sec-title-sm text-uppercase mb-0">Price</h3>
                                </div> 
                                <div className="filter-options w-50">                                    
                                </div>    
                            </div>                            
                        </div>
                    </div>                       
                </div>
            </div>
            <div className="filters mobile d-block d-xl-none">
                <div className="site-container">                
                    <ul className="nav nav-pills mb-0" id="pills-tab" role="tablist">                                    
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="watch-type-tab" data-bs-toggle="pill" data-bs-target="#watch-type" type="button" role="tab" aria-controls="watch-type" aria-selected="false" onClick={()=>showFiltersPopup("filterTypes")}>Type {typeFilters.length>0?<span className="filter-count sm ms-1">{typeFilters.length}</span>:''}</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="watch-complication-tab" data-bs-toggle="pill" data-bs-target="#watch-complication" type="button" role="tab" aria-controls="watch-complication" aria-selected="false" onClick={()=>showFiltersPopup("filterComplication")}>Complication {compFilters.length>0?<span className="filter-count sm ms-1">{compFilters.length}</span>:''}</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="watch-diameter-tab" data-bs-toggle="pill" data-bs-target="#watch-diameter" type="button" role="tab" aria-controls="watch-diameter" aria-selected="false" onClick={()=>showFiltersPopup("filterDiameter")}>Diameter {diaFilters.length>0?<span className="filter-count sm ms-1">{diaFilters.length}</span>:''}</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="watch-illumination-tab" data-bs-toggle="pill" data-bs-target="#watch-illumination" type="button" role="tab" aria-controls="watch-illumination" aria-selected="false" onClick={()=>showFiltersPopup("filterIllumination")}>Illumination {lmsnFilters.length>0?<span className="filter-count sm ms-1">{lmsnFilters.length}</span>:''}</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="watch-dial-Color-tab" data-bs-toggle="pill" data-bs-target="#watch-dial-Color" type="button" role="tab" aria-controls="watch-dial-Color" aria-selected="false" onClick={()=>showFiltersPopup("filterDialColor")}>Dial Color {dialFilters.length>0?<span className="filter-count sm ms-1">{dialFilters.length}</span>:''}</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="watch-case-color-tab" data-bs-toggle="pill" data-bs-target="#watch-case-color" type="button" role="tab" aria-controls="watch-case-color" aria-selected="false" onClick={()=>showFiltersPopup("filterCaseColor")}>Case Color {caseFilters.length>0?<span className="filter-count sm ms-1">{caseFilters.length}</span>:''}</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button className="nav-link" id="watch-strap-tab" data-bs-toggle="pill" data-bs-target="#watch-strap" type="button" role="tab" aria-controls="watch-strap" aria-selected="false" onClick={()=>showFiltersPopup("filterStrap")}>Strap {strapFilters.length>0?<span className="filter-count sm ms-1">{strapFilters.length}</span>:''}</button>
                        </li>                                       
                    </ul>
                </div>
                <Offcanvas className="offcanvas-top filters-popup" id="offcanvasFilters"
                    show={filtersPopup} 
                    onHide={closeFiltersPopup}  
                    backdrop={false} 
                    keyboard={true}
                    placement="top"					
                    scroll={true}		        	
                >		       
                    <Offcanvas.Body>
                        <div className="container-fluid ps-0 pe-0 ps-lg-3 pe-lg-3 d-flex align-items-center space-between">
                            <h2 className='title mb-0 text-uppercase'>Filters</h2>                                     
                            <span onClick={closeFiltersPopup} className="link">
                                <CloseIcon />                                
                            </span>					  		
                        </div>
                        <hr />
                        <div className="container-fluid ps-0 pe-0 ps-lg-3 pe-lg-3">		  									  	
                            <div className="accordion accordion-flush mt-3 filters filter-accordion" id="filterProducts">
                                <div className="accordion-item mb-2">
                                    <h2 className="accordion-header" id="filterByOrderHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#filterByOrder" aria-expanded={currentId===null || currentId==="filterByOrder"?"true":"false"} aria-controls="filterByOrder">Sort By</button>
                                    </h2>
                                    <div id="filterByOrder" className={currentId===null || currentId==="filterByOrder"?"accordion-collapse collapse show":"accordion-collapse collapse"} aria-labelledby="filterByOrderHeading" data-bs-parent="#filterProducts">
                                        <div className="accordion-body pt-2">
                                            <div className="filter-options">
                                                {orders.map((order,index)=>{ 
                                                    const {title, val, status}  =order;                                    
                                                    return(
                                                        <div key={'type-'+index} className={status===1?"field-wrap form-check":"d-none"}>
                                                            <input className="form-check-input" type="radio" name={'order-by'+val} id={'order-by-'+val}                                                   
                                                                value={val}
                                                                checked={val === orderBy? true: false}
                                                                onChange={() => handleOrder(val)}                                     
                                                            />
                                                            <label className="form-check-label other text-capitalize" htmlFor={'order-by-'+val}> {title} </label>                                   
                                                        </div>
                                                    );
                                                })}                                    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-2">
                                    <h2 className="accordion-header" id="filterTypesHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#filterTypes" aria-expanded={currentId==="filterTypes"?"true":"false"} aria-controls="filterTypes">Type</button>
                                    </h2>
                                    <div id="filterTypes" className={currentId==="filterTypes"?"accordion-collapse collapse show":"accordion-collapse collapse"} aria-labelledby="filterTypesHeading" data-bs-parent="#filterProducts">
                                        <div className="accordion-body pt-2">
                                            <div className="filter-options">
                                                {types.map((type,index)=>{
                                                    const {title, val}=type;                                       
                                                    return(
                                                        <div key={'type-'+index} className="field-wrap form-check check-btn">
                                                            <input className="form-check-input" type="checkbox" name={'type-'+val} id={'type-'+title}                                                   
                                                                value={val}
                                                                checked={typeFilters.includes(val)}
                                                                onChange={() => handleFilterState(typeFilters, setTypeFilters, val)}                                     
                                                            />
                                                            <label className="form-check-label other" htmlFor={'type-'+title}> {title} </label>                                   
                                                        </div>
                                                    );
                                                })}                                    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-2">
                                    <h2 className="accordion-header" id="filterComplicationHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#filterComplication" aria-expanded={currentId==="filterComplication"?"true":"false"} aria-controls="filterComplication">Complication</button>
                                    </h2>
                                    <div id="filterComplication" className={currentId==="filterComplication"?"accordion-collapse collapse show":"accordion-collapse collapse"} aria-labelledby="filterComplicationHeading" data-bs-parent="#filterProducts">
                                        <div className="accordion-body pt-2">
                                            <div className="filter-options">
                                            {complications.map((comp,index)=>{ 
                                                const{title, status} = comp;                                      
                                                return(
                                                    <div key={'comp-'+index} className={status===1?"field-wrap form-check check-btn":"field-wrap form-check check-btn disabled"}>
                                                        <input className="form-check-input" type="checkbox" name={title} id={title}                                                   
                                                            value={title}
                                                            checked={compFilters.includes(title)}
                                                            onChange={() => handleFilterState(compFilters, setCompFilters, title)}                                     
                                                        />
                                                        <label className="form-check-label other" htmlFor={title}> {title} </label>                                   
                                                    </div>
                                                );
                                            })}                                    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-2">
                                    <h2 className="accordion-header" id="filterDiameterHeading">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#filterDiameter" aria-expanded={currentId==="filterDiameter"?"true":"false"} aria-controls="filterDiameter">Diameter</button>
                                    </h2>
                                    <div id="filterDiameter" className={currentId==="filterDiameter"?"accordion-collapse collapse show":"accordion-collapse collapse"} aria-labelledby="filterDiameterHeading" data-bs-parent="#filterProducts">
                                        <div className="accordion-body pt-2">
                                            <div className="filter-options">
                                                {diameters.map((diameter,index)=>{  
                                                    const{title, val, status} =diameter;                                 
                                                    return(
                                                        <div key={'diameter-'+index} className={status===1?"field-wrap form-check check-btn":"field-wrap form-check check-btn disabled"}>
                                                            <input className="form-check-input" type="checkbox" name={val} id={val}                                                   
                                                                value={title}
                                                                checked={diaFilters.includes(title)}
                                                                onChange={() => handleFilterState(diaFilters, setDiaFilters, title)}                                     
                                                            />
                                                            <label className="form-check-label other" htmlFor={val}> {title} </label>                                   
                                                        </div>
                                                    );
                                                })}                                     
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-2">
                                    <h2 className="accordion-header" id="filterIlluminationH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#filterIllumination" aria-expanded={currentId==="filterIllumination"?"true":"false"} aria-controls="filterIllumination">Illumination</button>
                                    </h2>
                                    <div id="filterIllumination" className={currentId==="filterIllumination"?"accordion-collapse collapse show":"accordion-collapse collapse"} aria-labelledby="filterIlluminationH" data-bs-parent="#filterProducts">
                                        <div className="accordion-body pt-2">
                                            <div className="filter-options">
                                                {illimunations.map((illimunation,index)=>{ 
                                                    const {title, val}= illimunation ;                               
                                                    return(
                                                        <div key={'illimunation-'+index} className="field-wrap form-check check-btn">
                                                            <input className="form-check-input" type="checkbox" name={val} id={val}                                                   
                                                                value={title}
                                                                checked={lmsnFilters.includes(title)}
                                                                onChange={() => handleFilterState(lmsnFilters, setLmsnFilters, title)}                                     
                                                            />
                                                            <label className="form-check-label other" htmlFor={val}> {title} </label>                                   
                                                        </div>
                                                    );
                                                })}                                    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-2">
                                    <h2 className="accordion-header" id="filterfilterDialColorH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#filterDialColor" aria-expanded={currentId==="filterDialColor"?"true":"false"} aria-controls="filterDialColor">Dial Color</button>
                                    </h2>
                                    <div id="filterDialColor" className={currentId==="filterDialColor"?"accordion-collapse collapse show":"accordion-collapse collapse"} aria-labelledby="filterfilterDialColorH" data-bs-parent="#filterProducts">
                                        <div className="accordion-body pt-2">
                                            <div className="filter-options">
                                            {dialColors.map((dialColor,index)=>{
                                                const{title, status} =dialColor;                                           
                                                return(
                                                    <div key={'dial-color-'+index} className={status===1?"field-wrap form-check check-btn":"field-wrap form-check check-btn disabled"}>
                                                        <input className="form-check-input" type="checkbox" name={'dial-'+title} id={'dial-'+title}                                                   
                                                            value={title}
                                                            checked={dialFilters.includes(title)}
                                                            onChange={() => handleFilterState(dialFilters, setDialFilters, title)}                                     
                                                        />
                                                        <label className="form-check-label other" htmlFor={'dial-'+title}> {title} </label>                                   
                                                    </div>
                                                );
                                            })}                                    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-2">
                                    <h2 className="accordion-header" id="filterCaseColorH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#filterCaseColor" aria-expanded={currentId==="filterCaseColor"?"true":"false"} aria-controls="filterCaseColor">Case Color</button>
                                    </h2>
                                    <div id="filterCaseColor" className={currentId==="filterCaseColor"?"accordion-collapse collapse show":"accordion-collapse collapse"} aria-labelledby="filterCaseColorH" data-bs-parent="#filterProducts">
                                        <div className="accordion-body">
                                            <div className="filter-options">
                                                {caseColors.map((caseColor,index)=>{                                       
                                                    return(
                                                        <div key={'case-color-'+index} className="field-wrap form-check check-btn">
                                                            <input className="form-check-input" type="checkbox" name={'case-'+caseColor} id={'case-'+caseColor}                                                   
                                                                value={caseColor}
                                                                checked={caseFilters.includes(caseColor)}
                                                                onChange={() => handleFilterState(caseFilters, setCaseFilters, caseColor)}                                     
                                                            />
                                                            <label className="form-check-label other" htmlFor={'case-'+caseColor}> {caseColor} </label>                                   
                                                        </div>
                                                    );
                                                })}                                    
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-2">
                                    <h2 className="accordion-header" id="filterStrapH">
                                        <button className="accordion-button collapsed white-bg" type="button" data-bs-toggle="collapse" data-bs-target="#filterStrap" aria-expanded={currentId==="filterStrap"?"true":"false"} aria-controls="filterStrap">Strap</button>
                                    </h2>
                                    <div id="filterStrap" className={currentId==="filterStrap"?"accordion-collapse collapse show":"accordion-collapse collapse"} aria-labelledby="filterStrapH" data-bs-parent="#filterProducts">
                                        <div className="accordion-body">
                                            <div className="filter-options">
                                                {straps.map((strap,index)=>{
                                                    const{title, status} =strap;                                         
                                                    return(
                                                        <div key={'dial-color-'+index} className={status===1?"field-wrap form-check check-btn":"field-wrap form-check check-btn disabled"}>
                                                            <input className="form-check-input" type="checkbox" name={title} id={title}                                                   
                                                                value={title}
                                                                checked={strapFilters.includes(title)}
                                                                onChange={() => handleFilterState(strapFilters, setStrapFilters, title)}                                     
                                                            />
                                                            <label className="form-check-label other" htmlFor={title}> {title} </label>                                   
                                                        </div>
                                                    );
                                                })}                                     
                                            </div>
                                        </div>
                                    </div>
                                </div>                                              
                            </div>
                            <div className="row g-3 mt-5">
                                <div className="col-sm-6 order-2 order-sm-1">
                                    <div className='animated-btn-warp w-100'>
                                        <button type="button" className='btn rounded-blue-thin text-uppercase fs-6 w-100' onClick={()=>clearFilters()} >
                                            <span className='text-center text'>Clear</span>
                                            <span className='line-1'></span>
                                            <span className='line-2'></span>
                                            <span className='line-3'></span>
                                            <span className='line-4'></span>
                                        </button>
                                    </div>                                    
                                </div>
                                <div className="col-sm-6 order-1 order-sm-2">
                                    <div className='animated-btn-warp w-100'>
                                        <button type="button" className='btn rounded-blue text-uppercase fs-6 w-100' onClick={()=>closeFiltersPopup()} >
                                            <span className='text-center text'>Apply</span>
                                            <span className='line-1'></span>
                                            <span className='line-2'></span>
                                            <span className='line-3'></span>
                                            <span className='line-4'></span>
                                        </button>
                                    </div>                                    
                                </div>
                            </div>
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>                                                  
            </div>
		</>
	);
}
export default ProductsFilters;
import { createBrowserRouter } from "react-router-dom";
import RBLayout from "../../layouts/RBLayout";
import AuthLayout from "../../layouts/AuthLayout";
import RBHome from "../../pages/react-bootstrap/RBHome";
import RBBadges from "../../pages/react-bootstrap/RBBadges";
import RBBreadcrumb from "../../pages/react-bootstrap/RBBreadcrumb";
import RBButtons from "../../pages/react-bootstrap/RBButtons";
import RBButtonGroup from "../../pages/react-bootstrap/RBButtonGroup";
import RBCards from "../../pages/react-bootstrap/RBCards";
import RBImages from "../../pages/react-bootstrap/RBImages";
import RBListGroup from "../../pages/react-bootstrap/RBListGroup";
import RBFigure from "../../pages/react-bootstrap/RBFigure";
import RBPagination from "../../pages/react-bootstrap/RBPagination";
import RBPrgressBars from "../../pages/react-bootstrap/RBPrgressBars";
import RBTables from "../../pages/react-bootstrap/RBTables";
import RBSpinners from "../../pages/react-bootstrap/RBSpinners";
import RBAccordion from "../../pages/react-bootstrap/RBAccordion";
import RBCarousel from "../../pages/react-bootstrap/RBCarousel";
// import SignIn from "../../pages/auth/SignIn";
import RBDropdowns from "../../pages/react-bootstrap/RBDropdowns";
import RBModal from "../../pages/react-bootstrap/RBModal";
import RBNavbarOffcanvas from "../../pages/react-bootstrap/RBNavbarOffcanvas";
import RBForms from "../../pages/react-bootstrap/RBForms";
import RBOverlays from "../../pages/react-bootstrap/RBOverlays";
import RBNavTabs from "../../pages/react-bootstrap/RBNavTabs";
import RBFormsPractice from "../../pages/react-bootstrap/RBFormsPractice";
import RBFomicYupForm from "../../pages/react-bootstrap/RBFomicYupForm";
import BasicFormValidation from "../../pages/react-bootstrap/BasicFormValidation";
import RHFValidation from "../../pages/react-bootstrap/RHFValidation";
import RHFValidationYup from "../../pages/react-bootstrap/RHFValidationYup";
import RHFForm from "../../pages/react-bootstrap/RHFForm";
import RHFFormYup from "../../pages/react-bootstrap/RHFFormYup";

export const routes = createBrowserRouter(
    [
        // {element: <AuthLayout/>,
        //     children:[
        //         {path:"/", element:<SignIn/>},
        //     ]
        // },
        {
            element:<RBLayout/>,
            children:[
                {path:"/", element:<RBHome/>},
                {path:"/rb-badges", element:<RBBadges/>},
                {path:"/rb-breadcrumb", element:<RBBreadcrumb/>},
                {path:"/rb-buttons", element:<RBButtons/>},
                {path:"/rb-button-group", element:<RBButtonGroup/>},
                {path:"/rb-cards", element:<RBCards/>},
                {path:"/rb-images", element:<RBImages/>},
                {path:"/rb-listgroup", element:<RBListGroup/>},
                {path:"/rb-figure", element:<RBFigure/>},
                {path:"/rb-pagination", element:<RBPagination/>},
                {path:"/rb-progressbar", element:<RBPrgressBars/>},
                {path:"/rb-spinners", element:<RBSpinners/>},
                {path:"/rb-table", element:<RBTables/>},
                {path:"/rb-accordion", element:<RBAccordion/>},
                {path:"/rb-carousel", element:<RBCarousel/>},
                {path:"/rb-dropdown", element:<RBDropdowns/>},
                {path:"/rb-modal", element:<RBModal/>},
                {path:"/rb-navbar-off-canvas", element:<RBNavbarOffcanvas/>},
                {path:"/rb-navtabs", element:<RBNavTabs/>},
                {path:"/rb-overlays", element:<RBOverlays/>},
                {path:"/rb-forms", element:<RBForms/>},
                {path:"/rb-forms-practice", element:<RBFormsPractice/>},
                {path:"/rb-fomic-yup-form", element:<RBFomicYupForm/>},
                {path:"/rb-basic-form-validation", element:<BasicFormValidation/>},
                {path:"/rb-hook-form-validation", element:<RHFValidation/>},
                {path:"/rb-hook-form-validation-yup", element:<RHFValidationYup/>},
                {path:"/rb-hook-form", element:<RHFForm/>},
                {path:"/rb-hook-form-yup", element:<RHFFormYup/>},

            ]
        },
        
    ]
)